# serializers.py
from rest_framework import serializers
from .models import Teacher,Course,  Student,CourseCategory,Chapter,StudentCourseEnrollment,StudentAssignment,Quiz,QuizQuestions,CourseQuiz
class TeacherSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)  # Make password optional for updates

    class Meta:
        model = Teacher
        fields = ['id', 'full_name', 'email', 'qualification', 'mobile_no', 'skills', 'profile_pic', 'password']  # Include password in fields

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

        password = validated_data.get('password')
        if password:
            instance.set_password(password)

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
    total_enrolled_students = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'category', 'teacher', 'title', 'description', 'featured_img', 'techs', 'course_chapters', 'total_enrolled_students']
        depth = 1

    def get_total_enrolled_students(self, obj):
        return obj.total_enrolled_students()


class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourseEnrollment
        fields = ['id', 'course', 'student','enrolled_time']
        depth=1
    

class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAssignment  # Changed models.StudentAssignment to StudentAssignment
        fields = '__all__'
        depth=1

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model=Quiz
        fields= '__all__'

class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestions
        fields = ['quiz', 'questions', 'ans1', 'ans2', 'ans3', 'ans4', 'right_ans']

class CourseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseQuiz
        fields = ['id', 'teacher','course', 'quiz', 'add_time']