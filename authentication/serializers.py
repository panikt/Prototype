from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from authentication.models import Account
from drf_enum_field.serializers import EnumFieldSerializerMixin

class AccountSerializer(EnumFieldSerializerMixin, serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)
    class Meta:
        model = Account
        fields = ('id', 'email', 'username','CreatedAt', 'ModifiedAt',
                'first_name', 'last_name', 'tagline', 'password', 'confirm_password', 'image',
                'phone_number1','phone_number2', 'address1','address2','address3','dob','gender',
                 )
        read_only_fields = ('CreatedAt', 'ModifiedAt')


        def create(self, validated_data):
            return Account.objects.create(**validated_data)

        def update(self, instance, validated_data):
            instance.username = validated_data.get('username')
            instance.tagline = validated_data.get('tagline')

            instance.save()

            password = validated_data.get('password', None)
            confirm_password = validated_data.get('confirm_password', None)

            if password and confirm_password and password == confirm_password:
                instance.set_password(password)
                instance.save()

            update_session_auth_hash(self.context.get('request'),instance)

            return instance
