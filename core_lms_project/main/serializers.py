# serializers.py
from rest_framework import serializers
from .models import Teacher,Course,  Student,CourseCategory,Chapter

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['full_name', 'email', 'qualification', 'mobile_no', 'skills', 'password']  # Include password field

    def create(self, validated_data):
        teacher = Teacher(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            qualification=validated_data['qualification'],
            mobile_no=validated_data['mobile_no'],
            skills=validated_data.get('skills', '')  # Provide a default value for optional field
        )
        teacher.set_password(validated_data['password'])
        teacher.save()
        return teacher
    


class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = ['id', 'title', 'description']


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



class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'



        
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'