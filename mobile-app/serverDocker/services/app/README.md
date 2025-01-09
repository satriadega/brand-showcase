# Project Setup Instructions `brand-showcase/mobile-app/server/services/app`

## Steps to Run the Project

1. Set up `config.json` with the correct PostgreSQL address:
   - Navigate to the `config` folder.
   - Update `config.json` with your PostgreSQL `username`, `password`, `database`, and `host`.

2. Make the setup script executable:
   ```bash
   chmod +x setup.sh
3. Run the setup script:
   ```bash
   ./setup.sh
   npm start