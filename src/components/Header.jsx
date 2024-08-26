import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Header = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className="w-64 "
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#ffdae3',
          borderRight: 'none',
          borderTopRightRadius: '20px',
          borderBottomRightRadius: '20px',
        },
      }}
      
      classes={{ paper: 'w-64' }}
    >
      <div className="p-4">
        <img src="src/assets/logo-ppipo.png" alt="Logo" />
      </div>
      <List className="pt-8 pl-4">
        <ListItem button component={Link} to="/" className="hover:bg-gray-700">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/created" className="hover:bg-gray-700">
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Adicionar beneficiário" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Header;
