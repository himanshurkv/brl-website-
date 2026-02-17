import os
from flask import Flask, render_template, request, flash, redirect
from flask_mail import Mail, Message

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Replace with any random string

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your_email@gmail.com'        # Your Gmail
app.config['MAIL_PASSWORD'] = 'your_app_password_here'     # Gmail App Password
app.config['MAIL_DEFAULT_SENDER'] = 'your_email@gmail.com'

mail = Mail(app)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        message = request.form["message"]

        # Compose email
        msg = Message(
            subject=f"BRL Contact Form: {name}",
            recipients=['balajiroadlines5@gmail.com'],  # where you want to receive messages
            body=f"Name: {name}\nEmail: {email}\nMessage: {message}"
        )

        try:
            mail.send(msg)
            flash("Message sent successfully!", "success")
        except Exception as e:
            flash(f"Error sending message: {e}", "error")

        return redirect("/")

    return render_template("index.html")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)


