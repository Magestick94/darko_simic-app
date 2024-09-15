import { Link } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import LogoIcon from './LogoIcon';
import NavLinks from '../data/navLinks.json';

export default function Footer() {

  return (
    <Box p={5} display="flex" flexDirection="column" alignItems="center" style={{backgroundColor: "#333"}}>
      <Link to="/" style={{textDecoration: "none", color: "white"}}>
        <LogoIcon></LogoIcon>
      </Link>
      <Link to="category/DfAvYIxLs0bj09pjnExM" style={{textDecoration: "none", color: "white"}}>
        <Button
          sx={{ color: 'white', display: 'block' }}
        >
          Popularne kategorije
        </Button>
      </Link>
      {NavLinks.map((page) => (
        <Link key={page.name} to={page.path} style={{textDecoration: "none", color: "white"}}>
          <Button
            sx={{ color: 'white', display: 'block' }}
          >
            {page.name}
          </Button>
        </Link>
      ))}
    </Box>
  )
}