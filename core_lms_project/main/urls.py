# urls.py
from django.urls import path
from .views import register_student_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/student/', register_student_view, name='register_student'),
    path('login/student/', TokenObtainPairView.as_view(), name='student-login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
