# urls.py
from django.urls import path
from . import views

from .views import course_categories,create_course
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterTeacherView, teacher_login, logout_teacher_view, TeacherCourseList, TeacherCourseDetail, list_teachers_view, RegisterStudentView, student_login, logout_student_view,teacher_detail,ChangePasswordView,StudentEnrollCourseList,list_students_view,AssignmentList,MyAssignmentList,UpdateAssignmentView,QuizList,TeacherQuizList,delete_quiz,add_quiz_question,list_quiz_questions,AssignQuizToCourse,CourseQuizList
urlpatterns = [
    path('', views.index, name='index'),
     path('', views.home_view, name='home'),
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
    path('list-students/', list_students_view, name='list-students'),
    path('chapters/', views.ChapterList.as_view() ,name='chapter-list'),
    path('course-chapters/<int:course_id>/', views.CoursechapterList.as_view() ,name='chapter-list'),
    path('chapters/<int:pk>/', views.ChapterDetail.as_view(), name='chapter-detail'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('student-enroll-course/', views.StudentEnrollCourseList.as_view()),
    path('fetch-enrolled-students/<int:course_id>/', views.EnrolledStudentList.as_view()),
    path('fetch-all-enrolled-students/<int:teacher_id>', views.EnrolledStudentList.as_view()), 
    path('student-assignment/<int:teacher_id>/<int:student_id>', views.AssignmentList.as_view()), 
    path('my-assignments/<int:student_id>/', views.MyAssignmentList.as_view(), name='my-assignments'),
    path('update-assignment/<int:pk>/', UpdateAssignmentView.as_view(), name='update-assignment'),
    
    
    path('quiz/',views.QuizList.as_view(),name='list-quiz'),
    path('teacher-quiz/<int:teacher_id>/', TeacherQuizList.as_view(), name='teacher_quiz_list'),
    path('teacher-quiz-detail/<int:pk>/', views.TeacherQuizDetail.as_view(), name='teacher_quiz_detail'),
    path('quiz/<int:quiz_id>/', delete_quiz, name='quiz-delete'),
    path('quiz-questions/<int:quiz_id>/', list_quiz_questions, name='list-quiz-questions'),
    path('quiz-questions/<int:quiz_id>/add/', add_quiz_question, name='add-quiz-question'),
    path('assign-quiz/', views.AssignQuizToCourse.as_view(), name='assign-quiz-to-course'),
    
    
]