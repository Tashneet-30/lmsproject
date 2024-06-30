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

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

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
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='course_imgs/', null=True)
    techs = models.TextField()

    class Meta:
        verbose_name_plural = "Courses"

    def __str__(self):
        return self.title
