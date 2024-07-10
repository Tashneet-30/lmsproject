from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.http import JsonResponse
from . import models
from .models import Student, Course, CourseCategory, Teacher
from .serializers import StudentSerializer, CourseSerializer, TeacherSerializer, CourseCategorySerializer,ChapterSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
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
def logout_teacher_view(request):
    # Assuming you are using JWT tokens and clearing the token on logout
    return Response({'message': 'Successfully logged out'})





@api_view(['POST'])
@permission_classes([AllowAny])
def register_student_view(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)




#specific teacher coursec
class TeacherCourseList(APIView):
    def get(self, request, teacher_id):
        courses = Course.objects.filter(teacher_id=teacher_id)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
    



@api_view(['GET'])
@permission_classes([AllowAny])
def list_teachers_view(request):
    teachers = Teacher.objects.all()
    serializer = TeacherSerializer(teachers, many=True)
    return Response(serializer.data)

@permission_classes([AllowAny]) 
class ChapterList(generics.ListCreateAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer