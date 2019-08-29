import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';

import DrawerContent from './DrawerContent';

function LeftDrawer(props) {
	const { mobileOpen, drawerWidth, onDrawerToggle } = props;
	
    return (
        <>
            <Hidden mdUp>
                <SwipeableDrawer
                    anchor="left"
                    open={mobileOpen}
                    onOpen={onDrawerToggle}
                    onClose={onDrawerToggle}
                    style={{ width: drawerWidth }}
					ModalProps={{
						keepMounted: true // better open performance on mobile
					}}
                >
                    <DrawerContent drawerWidth={drawerWidth} onDrawerToggle={onDrawerToggle} />
                </SwipeableDrawer>
            </Hidden>
            <Hidden smDown>
                <Drawer open variant="permanent" style={{ width: drawerWidth }}>
                    <DrawerContent drawerWidth={drawerWidth} />
                </Drawer>
            </Hidden>
        </>
    );
}

export default LeftDrawer;
