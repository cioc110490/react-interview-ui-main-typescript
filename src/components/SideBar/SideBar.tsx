import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import React from "react";

interface Props {
    selected: string;
    setSelected: Function;
}

export default function SideBar({ selected, setSelected }: Props) {

    return (
        <Drawer variant="permanent">
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => setSelected('list')}
                        sx={{
                            backgroundColor: selected === 'list' ? 'grey.500' : 'transparent',
                            '&:hover': {
                                backgroundColor: selected === 'list' ? 'grey.600' : 'action.hover',
                            },
                        }}
                    >
                        <ListItemText primary='List' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setSelected('create')}>
                        <ListItemText primary='Create' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setSelected('update')}>
                        <ListItemText primary='Update' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setSelected('find')}>
                        <ListItemText primary='Find' />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setSelected('delete')}>
                        <ListItemText primary='Delete' />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}