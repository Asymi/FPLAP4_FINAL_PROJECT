from wtforms import Form, PasswordField, SubmitField, StringField, validators

class ResetPasswordForm(Form):
    password = PasswordField('New Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message="Passwords must match")
    ])
    confirm = PasswordField('Repeat Password')
    submit = SubmitField('Confirm reset')
    # token = 