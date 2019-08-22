import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import DrawerContent from './content';

// TODO: make swipeable
function LeftDrawer(props) {
	const { mobileOpen, drawerWidth, onDrawerToggle } = props;
	
    return (
        <>
            <Hidden mdUp>
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onClose={onDrawerToggle}
                    ModalProps={{
                        keepMounted: true // better open performance on mobile
                    }}
                    style={{ width: drawerWidth }}
                >
                    <DrawerContent drawerWidth={drawerWidth} onDrawerToggle={onDrawerToggle} />
                </Drawer>
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
