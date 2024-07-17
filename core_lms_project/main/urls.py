# urls.py
from django.urls import path
from . import views

from .views import course_categories,create_course
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterTeacherView, teacher_login, logout_teacher_view, TeacherCourseList, TeacherCourseDetail, list_teachers_view, RegisterStudentView, student_login, logout_student_view,teacher_detail,ChangePasswordView;
urlpatterns = [
    path('register-teacher/', RegisterTeacherView.as_view(), name='register-teacher'),
    path('teacher-login/', views.teacher_login, name='teacher_login'),
    path('logout-teacher/', logout_teacher_view, name='logout-teacher'),
    path('create-course/', create_course, name='create-course'),
    path('teachers/<int:pk>/', views.teacher_detail, name='teacher-detail'),
    path('course-categories/', course_categories, name='course-categories'),
    path('register-student/', RegisterStudentView.as_view(), name='register-student'),
    path('student-login/', views.student_login, name='student_login'),
    path('logout-student/', logout_student_view, name='logout-student'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('courses/', views.list_courses, name='list-courses'),
    path('courses/<int:pk>', views.CourseDetailView.as_view(), name='list-courses-id'),
    path('teacher-courses/<int:teacher_id>/', TeacherCourseList.as_view(), name='teacher_course_list'),
    path('teacher-courses-detail/<int:pk>/', views.TeacherCourseDetail.as_view(), name='teacher_course_detail'),
    path('list-teachers/', list_teachers_view, name='list-teachers'),
    path('chapters/', views.ChapterList.as_view() ,name='chapter-list'),
    path('course-chapters/<int:course_id>/', views.CoursechapterList.as_view() ,name='chapter-list'),
    path('chapters/<int:pk>/', views.ChapterDetail.as_view(), name='chapter-detail'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
]
