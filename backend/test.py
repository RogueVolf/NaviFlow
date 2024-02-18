import chromadb

db = chromadb.PersistentClient('./db')

main_collection = db.create_collection(name="Queries")

main_collection = db.get_collection(name="Queries")

queries = [
    (
        "How do I create a basic Flask app?",
        [
            "Create a new Python file.",
            "Import the Flask module.",
            "Create a Flask web server instance.",
            "Define routes and their corresponding functions.",
            "Run the app using app.run().",
        ],
        ["Alice", "Bob", "Charlie", "David", "Eva"]
    ),
    (
        "What is the purpose of Flask's route decorators?",
        [
            "Route decorators bind URL patterns to functions.",
            "They define the behavior for different routes.",
            "Each decorated function handles a specific URL route.",
            "URL patterns are defined using the @app.route() decorator.",
            "It makes routing in Flask simple and elegant.",
        ],
        ["Frank", "Grace", "Hank", "Isabel", "Jack"]
    ),
    (
        "How can I pass parameters in a Flask route?",
        [
            "Define parameters in the route's URL pattern.",
            "Access parameters in the route function's arguments.",
            "Use variable converters like <string:name> in the URL.",
            "URL parameters are automatically converted to the specified type.",
            "Example: @app.route('/user/<string:username>')",
        ],
        ["Kathy", "Liam", "Mia", "Nathan", "Olivia"]
    ),
    (
        "Explain Flask's template engine, Jinja2.",
        [
            "Jinja2 is a powerful and easy-to-use template engine for Python.",
            "It allows embedding dynamic content in HTML templates.",
            "Use {{ ... }} for expressions and {% ... %} for control statements.",
            "Templates can include logic, variables, and control structures.",
            "It helps separate the presentation layer from the application logic.",
        ],
        ["Paul", "Quinn", "Riley", "Samantha", "Thomas"]
    ),
    (
        "How can I handle forms in Flask?",
        [
            "Use Flask-WTF or WTForms for form handling.",
            "Create a form class using WTForms.",
            "Render forms in templates and validate user input.",
            "Access form data in the route function using request.form.",
            "Handle form submissions and validate data on the server side.",
        ],
        ["Ursula", "Victor", "Wendy", "Xavier", "Yvonne"]
    ),
    (
        "What is Flask's application context?",
        [
            "Flask uses an application context to manage the app during a request.",
            "The app context is pushed before a request and popped after it ends.",
            "Current_app and g (global) are two important objects in the context.",
            "It ensures that certain variables are only accessed during a request.",
            "The app context is automatically managed by Flask.",
        ],
        ["Zachary", "Abigail", "Benjamin", "Cynthia", "Daniel"]
    ),
    (
        "How can I work with databases in Flask?",
        [
            "Flask-SQLAlchemy is commonly used for database integration.",
            "Define models as classes, representing database tables.",
            "Use SQLAlchemy to query and interact with the database.",
            "Migrate the database schema with Flask-Migrate.",
            "Handle database sessions, commits, and rollbacks in Flask routes.",
        ],
        ["Emma", "Felix", "Grace", "Henry", "Ivy"]
    ),
    (
        "Explain Flask's middleware concept.",
        [
            "Middleware are functions that run before the request reaches a route.",
            "They can modify the request, add headers, or perform other tasks.",
            "Use @app.before_request and @app.after_request decorators.",
            "Middleware functions can be used for authentication, logging, etc.",
            "They provide a way to execute code globally for each request.",
        ],
        ["Jake", "Kylie", "Leo", "Megan", "Noah"]
    ),
    (
        "How can I implement user authentication in Flask?",
        [
            "Use Flask-Login for user authentication and session management.",
            "Create a user model, implement login, and logout routes.",
            "Secure routes using the @login_required decorator.",
            "Store user information in the session.",
            "Hash and salt passwords using Werkzeug's security helpers.",
        ],
        ["Oliver", "Penelope", "Quincy", "Ruby", "Samuel"]
    ),
    (
        "Explain Flask's error handling and exception handling mechanisms.",
        [
            "Flask provides error handlers to handle specific HTTP error codes.",
            "Use @app.errorhandler to define custom error handlers.",
            "Handle exceptions using try-except blocks in route functions.",
            "Flask's error handling is flexible and can be customized.",
            "It helps improve the user experience when unexpected errors occur.",
        ],
        ["Tara", "Ulysses", "Violet", "William", "Xena"]
    ),
]


for i,q in enumerate(queries):
    main_collection.add(
        documents=q[0],
        metadatas={'answers':'**'.join(q[1]),'username':"**".join(q[2])},
        ids=str(i+1)
    )

print("Data added")

results = main_collection.query(
    query_texts=["How do I create a basic Flask app?"],
    n_results=2
)
print(results)
ids = results['ids'][0][0]
answers = results['metadatas'][0][0]['answers'].split("**")
print(ids,answers)
