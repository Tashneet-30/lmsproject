# urls.py
from django.urls import path
from . import views
from .views import register_student_view
from .views import course_categories,create_course
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterTeacherView, teacher_login, logout_teacher_view,TeacherCourseList,list_teachers_view
urlpatterns = [
    path('register-teacher/', RegisterTeacherView.as_view(), name='register-teacher'),
    path('teacher-login/', views.teacher_login, name='teacher_login'),
    path('logout-teacher/', logout_teacher_view, name='logout-teacher'),
    path('create-course/', create_course, name='create-course'),
    path('course-categories/', course_categories, name='course-categories'),
    path('register/student/', register_student_view, name='register_student'),
    path('login/student/', TokenObtainPairView.as_view(), name='student-login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('courses/', views.list_courses, name='list-courses'),
    path('teacher-courses/<int:teacher_id>/', views.TeacherCourseList.as_view(), name='list-courses'),
    path('list-teachers/', list_teachers_view, name='list-teachers'),
    path('chapters/', views.ChapterList.as_view() ,name='chapter-list'),
    path('course-chapters/<int:course_id>/', views.CoursechapterList.as_view() ,name='chapter-list'),
]
