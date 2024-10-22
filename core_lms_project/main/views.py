from rest_framework import status, generics,viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.http import JsonResponse
from . import models
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.shortcuts import render
from rest_framework import status
from .models import Student, Course, CourseCategory, Teacher,Chapter,StudentCourseEnrollment,StudentAssignment,Quiz,QuizQuestions,CourseQuiz
from .serializers import StudentSerializer, CourseSerializer, TeacherSerializer, CourseCategorySerializer,ChapterSerializer,StudentCourseEnrollSerializer,StudentAssignmentSerializer,QuizSerializer,QuizQuestionSerializer,CourseQuizSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password

def home_view(request):
    return render(request, 'home.html')
def index(request):
    return render(request, 'index.html')
@permission_classes([AllowAny])
class RegisterTeacherView(APIView):
    def post(self, request):
        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def teacher_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    print(f"Received email: {email}")
    print(f"Received password: {password}")

    try:
        teacher = Teacher.objects.get(email=email)
        if check_password(password, teacher.password):
            response = {
                'bool': True,
                'teacher_id': teacher.id
            }
        else:
            response = {
                'bool': False
            }
    except Teacher.DoesNotExist:
        response = {
            'bool': False
        }

    return JsonResponse(response)






@api_view(['POST'])
@permission_classes([AllowAny])
def logout_student_view(request):
    # Assuming you are using JWT tokens and clearing the token on logout
    return Response({'message': 'Successfully logged out'})

@permission_classes([AllowAny])
class RegisterStudentView(APIView):
    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def student_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    print(f"Received email: {email}")
    print(f"Received password: {password}")

    try:
        student = Student.objects.get(email=email)
        if check_password(password, student.password):
            response = {
                'bool': True,
                'student_id': student.id
            }
        else:
            response = {
                'bool': False
            }
    except Student.DoesNotExist:
        response = {
            'bool': False
        }

    return JsonResponse(response)



@api_view(['POST'])
@permission_classes([AllowAny])
def logout_teacher_view(request):
    # Assuming you are using JWT tokens and clearing the token on logout
    return Response({'message': 'Successfully logged out'})






  

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh)
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def logout_view(request):
    # Assuming you are using JWT tokens and clearing the token on logout
    return Response({'message': 'Successfully logged out'})


@api_view(['GET'])
@permission_classes([AllowAny])
def course_categories(request):
    categories = CourseCategory.objects.all()
    serializer = CourseCategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])  # Allow any user to create a course for now
def create_course(request):
    # Assuming you have a serializer defined for Course model
    serializer = CourseSerializer(data=request.data)
    
    if serializer.is_valid():
        # Set a default teacher ID for now (you can change this logic later)
        teacher_id = 1  # Default teacher ID
        
        # Save the course with the default teacher ID
        serializer.save(teacher_id=teacher_id)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def list_courses(request):
    # Get all courses from the database
    courses = Course.objects.all()

    # Optionally handle query parameters
    result_param = request.query_params.get('result')
    if result_param:
        try:
            limit = int(result_param)
            # Limit the queryset if result param is provided (example logic)
            courses = courses.order_by('-id')[:limit]
        except ValueError:
            # Handle the case where result_param is not an integer
            return Response({'error': 'Invalid result parameter. Must be an integer.'}, status=status.HTTP_400_BAD_REQUEST)

    # Serialize the queryset
    serializer = CourseSerializer(courses, many=True)

    # Return serialized data as JSON response
    return Response(serializer.data)


# 
    
    # def get(self, request, teacher_id):
    #     courses = Course.objects.filter(teacher_id=teacher_id)
    #     serializer = self.get_serializer(courses, many=True)
    #     return Response(serializer.data)




@permission_classes([AllowAny])
class TeacherCourseList(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        return Course.objects.filter(teacher_id=teacher_id)
    
@permission_classes([AllowAny])  # Adjust permissions as needed
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
@api_view(['GET'])
@permission_classes([AllowAny])
def list_teachers_view(request):
    teachers = Teacher.objects.all()
    serializer = TeacherSerializer(teachers, many=True)
    return Response(serializer.data)
@api_view(['GET'])
@permission_classes([AllowAny])
def list_students_view(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

@permission_classes([AllowAny]) 
class ChapterList(generics.ListCreateAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer


@permission_classes([AllowAny])
class CoursechapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = Course.objects.get(pk=course_id)
        return Chapter.objects.filter(course=course)
    
@permission_classes([AllowAny])
class ChapterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer



@permission_classes([AllowAny])
class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


@api_view(['GET', 'PUT'])
@permission_classes([AllowAny])
def teacher_detail(request, pk):
    try:
        teacher = Teacher.objects.get(pk=pk)
    except Teacher.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TeacherSerializer(teacher)
        return Response(serializer.data)

    elif request.method == 'PUT':
        print("Received data:", request.data)
        serializer = TeacherSerializer(teacher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print("Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@permission_classes([AllowAny])
class ChangePasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')  # Assume email is passed in the request data

        # Ensure the user is a teacher
        try:
            teacher = Teacher.objects.get(email=email)
        except Teacher.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not check_password(current_password, teacher.password):
            return Response({'error': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if new_password != confirm_password:
            return Response({'error': 'New passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)

        teacher.set_password(new_password)
        teacher.save()
        
        return Response({'success': 'Password updated successfully.'}, status=status.HTTP_200_OK)
    

@permission_classes([AllowAny])
class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset=models.StudentCourseEnrollment.objects.all()
    serializer_class=StudentCourseEnrollSerializer

@permission_classes([AllowAny])
class EnrolledStudentList(generics.ListAPIView):
    serializer_class = StudentCourseEnrollSerializer



    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course=models.Teacher.objects.get(pk=course_id)
            return StudentCourseEnrollment.objects.filter(course_id=course_id)
        elif 'teacher_id':
            teacher_id = self.kwargs.get('teacher_id')
            return StudentCourseEnrollment.objects.filter(course__teacher_id=teacher_id).distinct()


            
@permission_classes([AllowAny])
class AssignmentList(generics.ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer

    def get_queryset(self):
        student_id = self.kwargs['student_id']
        teacher_id = self.kwargs['teacher_id']
        student = models.Student.objects.get(pk=student_id)
        teacher = models.Teacher.objects.get(pk=teacher_id)

       
        return models.StudentAssignment.objects.filter(student=student, teacher=teacher)

    def perform_create(self, serializer):
        student_id = self.kwargs['student_id']
        teacher_id = self.kwargs['teacher_id']
        student = models.Student.objects.get(pk=student_id)
        teacher = models.Teacher.objects.get(pk=teacher_id)
        instance = serializer.save(student=student, teacher=teacher)

                
@permission_classes([AllowAny])
class MyAssignmentList(generics.ListAPIView):
    serializer_class = StudentAssignmentSerializer

    def get_queryset(self):
        student_id = self.kwargs['student_id']
        student = Student.objects.get(pk=student_id)
        return StudentAssignment.objects.filter(student=student)
    
@permission_classes([AllowAny])
class UpdateAssignmentView(APIView):
    def post(self, request, pk):
        try:
            assignment = StudentAssignment.objects.get(id=pk)
            assignment.status = 'completed'
            assignment.save()
            return Response({'status': 'success'}, status=status.HTTP_200_OK)
        except StudentAssignment.DoesNotExist:
            return Response({'error': 'Assignment not found'}, status=status.HTTP_404_NOT_FOUND)
        


@permission_classes([AllowAny])
class QuizList(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class =  QuizSerializer


@permission_classes([AllowAny])
class TeacherQuizList(generics.ListAPIView):
    serializer_class = QuizSerializer

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        return Quiz.objects.filter(teacher_id=teacher_id)


@permission_classes([AllowAny])  # Adjust permissions as needed
class TeacherQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_quiz(request, quiz_id):
    try:
        quiz = Quiz.objects.get(pk=quiz_id)
        quiz.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Quiz.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
@api_view(['POST'])
@permission_classes([AllowAny])
def add_quiz_question(request, quiz_id):
    if request.method == 'POST':
        data = request.data.copy()
        data['quiz'] = quiz_id
        
        serializer = QuizQuestionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def list_quiz_questions(request, quiz_id):
    try:
        quiz = Quiz.objects.get(pk=quiz_id)
    except Quiz.DoesNotExist:
        return Response({'error': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)

    questions = QuizQuestions.objects.filter(quiz=quiz)
    serializer = QuizQuestionSerializer(questions, many=True)
    return Response(serializer.data)


@permission_classes([AllowAny])  # Adjust permissions as needed
class AssignQuizToCourse(APIView):
    def post(self, request, *args, **kwargs):
        quiz_id = request.data.get('quiz_id')
        course_id = request.data.get('course_id')
        teacher_id = request.data.get('teacher_id')

        if not all([quiz_id, course_id, teacher_id]):
            return Response({'detail': 'Missing required fields.'}, status=status.HTTP_400_BAD_REQUEST)

        # Assuming you have a validation method or you directly create the object
        try:
            course_quiz = CourseQuiz.objects.create(
                quiz_id=quiz_id,
                course_id=course_id,
                teacher_id=teacher_id
            )
            serializer = CourseQuizSerializer(course_quiz)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CourseQuizList(generics.ListAPIView):
    serializer_class = CourseQuizSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        return CourseQuiz.objects.filter(course_id=course_id)