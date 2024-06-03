import { AppShell, Box, Burger, Container, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink as Link, Outlet, useLocation } from "react-router-dom";
import { IconTruck } from "@tabler/icons-react";

import classes from "./App.module.css";

export const App = () => {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header p={24}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Box className={classes.logoWrapper}>
          <Link style={{ textDecoration: "none", color: "#000" }} to="/">
            🚚 ERP System
          </Link>
        </Box>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          to="/trucks"
          active={location.pathname === "/trucks"}
          component={Link}
          label="Truck Data"
          leftSection={<IconTruck size="1rem" stroke={1.5} />}
        />
        <NavLink disabled to="/employee" component={Link} label="Employee" />
        <NavLink disabled to="/factory" component={Link} label="Factory" />
        <NavLink disabled to="/customer" component={Link} label="Customer" />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
