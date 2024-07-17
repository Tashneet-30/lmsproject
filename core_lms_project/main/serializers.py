# serializers.py
from rest_framework import serializers
from .models import Teacher,Course,  Student,CourseCategory,Chapter
class TeacherSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)  # Ensure password field is here

    class Meta:
        model = Teacher
        fields = ['id', 'full_name', 'email', 'qualification', 'mobile_no', 'skills', 'profile_pic', 'password']  # Add password to fields

    def create(self, validated_data):
        password = validated_data.pop('password')
        teacher = Teacher(**validated_data)
        teacher.set_password(password)
        teacher.save()
        return teacher

    def update(self, instance, validated_data):
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.email = validated_data.get('email', instance.email)
        instance.qualification = validated_data.get('qualification', instance.qualification)
        instance.mobile_no = validated_data.get('mobile_no', instance.mobile_no)
        instance.skills = validated_data.get('skills', instance.skills)

        profile_pic = validated_data.get('profile_pic')
        if profile_pic:
            instance.profile_pic = profile_pic

        instance.save()
        return instance
    
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student  # Ensure this is Student, not Teacher
        fields = ['full_name', 'email', 'password', 'username', 'interest']  # Include password field

    def create(self, validated_data):
        student = Student(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            username=validated_data['username'],
            interest=validated_data.get('interest', '')  # Provide a default value for optional field
        )
        student.set_password(validated_data['password'])
        student.save()
        return student

class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = ['id', 'title', 'description']

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    course_chapters = ChapterSerializer(many=True, read_only=True)
    teacher = TeacherSerializer(read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'category', 'teacher', 'title', 'description', 'featured_img', 'techs', 'course_chapters']
        depth = 1
