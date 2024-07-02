from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .models import Student, Course, CourseCategory, Teacher
from .serializers import StudentSerializer, CourseSerializer, TeacherSerializer, CourseCategorySerializer


@permission_classes([AllowAny])
class RegisterTeacherView(APIView):
    def post(self, request):
        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([AllowAny])
def login_teacher_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(username=email, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh)
        })
    else:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)









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