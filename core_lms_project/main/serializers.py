# serializers.py
from rest_framework import serializers
from .models import Teacher, Student

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id', 'full_name', 'email', 'password', 'qualification', 'mobile_no', 'skills']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        teacher = Teacher.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            qualification=validated_data['qualification'],
            mobile_no=validated_data['mobile_no'],
            skills=validated_data['skills']
        )
        teacher.set_password(validated_data['password'])
        teacher.save()
        return teacher

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'full_name', 'email', 'password', 'username', 'interest']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        student = Student.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            username=validated_data['username'],
            interest=validated_data['interest']
        )
        student.set_password(validated_data['password'])
        student.save()
        return student
