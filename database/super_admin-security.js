{
  "super_admin": {
    "id": "1",
    "username": "superadmin",
    "display_name": "SUPER ADMIN #1",
    "role": "SUPER_ADMIN",
    "power_level": 9999,
    "uid": "BSS1815-SUPER-ADMIN-UID",
    "password": "1815",
    "status": "active",
    "permissions": [
      "FULL_SYSTEM_CONTROL",
      "MANAGE_ADMINS",
      "APPROVE_MEDIA",
      "DELETE_MEDIA",
      "ACCESS_DASHBOARD",
      "ACCESS_SECURITY_PANEL",
      "EDIT_BANNERS",
      "EDIT_PRODUCTS",
      "EDIT_EVENTS",
      "EDIT_TEAMS",
      "VIEW_LOGS"
    ],
    "last_update": "2026-01-01T00:00:00Z"
  },

  "admins": [
    {
      "id": "A1",
      "username": "admin1",
      "display_name": "ADMIN LEVEL 1",
      "role": "ADMIN",
      "power_level": 5000,
      "uid": "BSS1815-ADMIN-UID-1",
      "password": "admin123",
      "status": "active",
      "permissions": [
        "APPROVE_MEDIA",
        "UPLOAD_MEDIA",
        "EDIT_EVENTS",
        "EDIT_TEAMS"
      ],
      "last_update": "2026-01-01T00:00:00Z"
    },
    {
      "id": "A2",
      "username": "admin2",
      "display_name": "ADMIN LEVEL 2",
      "role": "ADMIN",
      "power_level": 3000,
      "uid": "BSS1815-ADMIN-UID-2",
      "password": "admin456",
      "status": "active",
      "permissions": [
        "UPLOAD_MEDIA",
        "EDIT_TEAMS"
      ],
      "last_update": "2026-01-01T00:00:00Z"
    }
  ],

  "security_logs": [
    {
      "log_id": "LOG-001",
      "action": "LOGIN_SUCCESS",
      "user": "superadmin",
      "timestamp": "2026-01-01T12:00:00Z"
    },
    {
      "log_id": "LOG-002",
      "action": "UPLOAD_MEDIA",
      "user": "admin1",
      "timestamp": "2026-01-02T15:30:00Z"
    }
  ]
}
