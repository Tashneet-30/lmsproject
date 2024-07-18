# models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password, check_password

class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)  # Storing hashed password
    qualification = models.CharField(max_length=100)
    mobile_no = models.CharField(max_length=100)
    skills = models.TextField()
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True)  # Add this line

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def __str__(self):
        return self.full_name

class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)  # Storing hashed password
    username = models.CharField(max_length=100, unique=True)
    interest = models.TextField()

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

   

    def __str__(self):
        return self.full_name

class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "Course Categories"

    def __str__(self):
        return self.title

class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='course_imgs/', null=True)
    techs = models.TextField()
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, default='1')

    class Meta:
        verbose_name_plural = "Courses"

    def total_enrolled_students(self):
        total_enrolled_students = StudentCourseEnrollment.objects.filter(course=self).count()
        return total_enrolled_students

    def __str__(self):
        return self.title

class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_chapters')
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to='chapter_videos/', null=True)
    remarks = models.TextField(null=True)

    class Meta:
        verbose_name_plural = "Chapters"

    def __str__(self):
        return self.title

#student course enroll
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrolled_courses")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="enrolled_student")
    enrolled_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Enrolled Courses"
    
    def __str__(self):
        return f"{self.course}-{self.student}"


class StudentAssignment(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    detail = models.TextField(null=True)
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title  # Fixed the __str__ method to return the title correctly

    class Meta:
        verbose_name_plural = "Student Assignments"


# 1. 👇 Add the following line
class Notification(models.Model):
    message = models.CharField(max_length=100)
    
    def __str__(self):
        return self.message