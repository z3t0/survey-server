from registration.forms import RegistrationForm
from django.contrib.auth.models import User

from django import forms

class RegistrationFormWithName(RegistrationForm):
    first_name = forms.CharField(required=True)

    class Meta(RegistrationForm.Meta):
         fields = [
             'first_name',
             User.USERNAME_FIELD,
             'email',
             'password1',
             'password2'
        ]
