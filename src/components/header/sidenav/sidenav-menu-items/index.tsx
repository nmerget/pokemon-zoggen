import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { SideNavMenuItemsType } from './data';
import TextDivider from '../../../base/text-divider';

const SideNavMenuItems = ({
  id,
  menuItems,
}: SideNavMenuItemsType): ReactElement => (
  <List>
    {menuItems.map((item, index) => (
      <React.Fragment key={`sidenav-${id}-menu-item-${index}`}>
        <ListItem>
          {!item.items ? (
            <ListItemButton style={{ padding: 0 }}>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'border-b-2 border-blue-600' : ''}`
                }
                to={item.link || '/'}
              >
                <ListItemText>{item.label}</ListItemText>
              </NavLink>
            </ListItemButton>
          ) : (
            <TextDivider text={item.label} />
          )}
        </ListItem>
        {item.items && (
          <SideNavMenuItems
            id={item.label.toLowerCase()}
            menuItems={item.items}
          />
        )}
      </React.Fragment>
    ))}
  </List>
);

export default SideNavMenuItems;
