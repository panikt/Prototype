from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils.translation import ugettext as _
from enumfields import Enum, EnumField

class AccountManager(BaseUserManager):
        def create_user(self, email, password=None, **kwargs):
            if not email:
                raise ValueError("user must have a valid email address")
            if not kwargs.get('username'):
                raise ValueError("Users must have a valid username")

            account = self.model(
                email=self.normalize_email(email), username=kwargs.get('username')
            )

            account.set_password(password)
            account.save()

            return account

        def create_superuser(self, email, password, **kwargs):
            account = self.create_user(email, password, **kwargs)

            account.is_admin = True
            account.save()

            return account

class GenderType(Enum):
    MALE = 'MALE'
    FEMALE = 'FEMALE'

class Account(AbstractBaseUser):


    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40,unique=True)

    first_name = models.CharField(max_length=40,blank=True)
    last_name = models.CharField(max_length=40,blank=True)
    tagline = models.CharField(max_length=140,blank=True)

    is_admin = models.BooleanField(default=False)
    phone_number1 = models.CharField(max_length=40,blank=True)
    phone_number2 = models.CharField(max_length=40,blank=True)
    address1 = models.CharField(max_length=100,blank=True)
    address2 = models.CharField(max_length=100,blank=True)
    address3 = models.CharField(max_length=100,blank=True)
    dob = models.DateTimeField(null=True, blank=True)
    image = models.CharField(max_length=255,blank=True,default='http://127.0.0.1:8000/media/gallery/default.png')
    gender = EnumField(GenderType,null=True)

    CreatedAt = models.DateTimeField(auto_now_add=True)
    ModifiedAt = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']



    def __str__(self):
        return self.email

    def get_full_name(self):
        return ' '.join(self.first_name, self.last_name)

    def get_short_name(self):
        return self.first_name
