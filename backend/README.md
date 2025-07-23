# Upvotia Backend

A Django REST API backend for the Upvotia platform - a community-driven platform where users can submit ideas/wishes and developers can create projects to fulfill them.

## Features

### Core Functionality
- **Wishes**: User-submitted ideas/requests for tools and apps
- **Projects**: Developer-submitted implementations of wishes
- **Upvotes**: Community voting system for wishes and projects
- **Boosts**: Financial backing/crowdfunding for wishes and projects
- **Comments**: Discussion system with nested replies
- **User Profiles**: Extended profiles with user types (user/developer)

### API Features
- JWT Authentication
- RESTful API with filtering, search, and pagination
- File uploads (images for wishes/projects, avatars)
- Generic foreign keys for flexible relationships
- Admin interface for content management

## Quick Start

### 1. Setup Environment
```bash
# Activate virtual environment (backend_env should already exist)
source backend_env/bin/activate  # On Windows: backend_env\Scripts\activate

# Install dependencies
pip install -r backend/requirements.txt
```

### 2. Database Setup
```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
```

### 3. Run Development Server
```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/api/`

## API Endpoints

### Authentication
- `POST /api/auth/token/` - Login (get JWT tokens)
- `POST /api/auth/token/refresh/` - Refresh JWT token

### Users
- `POST /api/users/register/` - User registration
- `GET /api/users/profile/` - Current user profile
- `PUT /api/users/profile/update/` - Update profile
- `GET /api/users/profile/{id}/` - Public user profile

### Wishes
- `GET /api/wishes/` - List wishes (with filtering/search)
- `POST /api/wishes/` - Create wish (authenticated)
- `GET /api/wishes/{id}/` - Get wish details
- `POST /api/wishes/{id}/upvote/` - Toggle upvote

**Query Parameters:**
- `tool` - Filter by tool/app name
- `category` - Filter by category
- `search` - Search in title/description
- `sort` - Sort by 'Newest', 'Most Funded', 'Top Boosted'

### Projects
- `GET /api/projects/` - List projects (with filtering/search)
- `POST /api/projects/` - Create project (authenticated developers)
- `GET /api/projects/{id}/` - Get project details
- `POST /api/projects/{id}/upvote/` - Toggle upvote
- `POST /api/projects/{id}/add_update/` - Add progress update

### Boosts (Funding)
- `GET /api/boosts/` - List all boosts
- `POST /api/boosts/create/` - Create boost for wish/project

**Boost Creation Example:**
```json
{
  "app_label": "wishes",
  "model_name": "wish", 
  "object_id": 1,
  "amount": 25.00,
  "message": "Great idea!"
}
```

### Comments
- `GET /api/comments/` - List comments (filtered by content)
- `POST /api/comments/create/` - Create comment

**Comment Creation Example:**
```json
{
  "app_label": "wishes",
  "model_name": "wish",
  "object_id": 1,
  "content": "This is a great idea!",
  "parent": null
}
```

### Upvotes
- `GET /api/upvotes/` - List all upvotes

## Data Models

### Wish
- User-submitted ideas/requests
- Fields: title, tool_app_name, description, categories, pledge_amount, image
- Relations: upvotes, boosts, comments

### Project  
- Developer-submitted implementations
- Fields: title, tool_app_name, description, github_repo, demo_link, tutorial_link, technologies, hours_worked, status
- Relations: upvotes, boosts, comments, updates

### UserProfile
- Extended user information
- Fields: bio, avatar, user_type (user/dev), github_url, twitter_url

### Boost
- Financial backing for wishes/projects
- Generic foreign key allows boosting any content type

### Comment
- Discussion system with nested replies
- Generic foreign key allows commenting on any content type

## Frontend Integration

The backend is designed to work with the React frontend. Key integration points:

1. **Authentication**: Use JWT tokens in Authorization header
2. **File Uploads**: Support for image uploads (wishes, projects, avatars)
3. **Real-time Data**: API supports filtering and search for dynamic UIs
4. **User Types**: Backend distinguishes between regular users and developers
5. **Flexible Content**: Generic foreign keys allow upvotes/comments/boosts on multiple content types

## Development

### Adding New Features
1. Create new Django apps in the backend directory
2. Add to `INSTALLED_APPS` in settings.py
3. Include URLs in main urls.py
4. Run migrations: `python manage.py makemigrations && python manage.py migrate`

### Database Schema Changes
```bash
python manage.py makemigrations
python manage.py migrate
```

### Admin Access
Visit `http://127.0.0.1:8000/admin/` with superuser credentials to manage content.

## Production Deployment

1. Set environment variables:
   - `DJANGO_SECRET_KEY`
   - `DJANGO_DEBUG=False`
   - `DJANGO_ALLOWED_HOSTS=your-domain.com`
   - `CORS_ALLOWED_ORIGINS=https://your-frontend.com`

2. Use PostgreSQL instead of SQLite:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'upvotia_db',
           'USER': 'your_user',
           'PASSWORD': 'your_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

3. Configure static/media file serving
4. Use a production WSGI server like Gunicorn 