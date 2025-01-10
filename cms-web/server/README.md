# Project Setup Instructions `brand-showcase/cms-web/server`

## Steps to Run the Project

1. Set up `config.json` with the correct PostgreSQL address:
   - Navigate to the `config` folder.
   - Update `config.json` with your PostgreSQL `username`, `password`, `database`, and `host`.

2. Make the setup script executable:
   ```bash
   chmod +x dbsetup-sequelize.sh #for db-setup
   chmod +x dbdrop-sequelize.sh #for db-drop
3. Run the setup script:
   ```bash
   npm install
   ./dbsetup-sequelize.sh
   npm start