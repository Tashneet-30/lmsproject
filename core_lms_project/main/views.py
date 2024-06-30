# views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
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