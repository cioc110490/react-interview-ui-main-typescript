import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";

interface Props {
    selected: string;
    setSelected: Function;
}

export default function SideBar({ selected, setSelected }: Props) {

    const sharedProps = { selected, setSelected };

    return (
        <Drawer variant="permanent">
            <List>
                <SideBarItem title='List' {...sharedProps} />
                <SideBarItem title='Create' {...sharedProps} />
                <SideBarItem title='Update' {...sharedProps} />
                <SideBarItem title='Find' {...sharedProps} />
                <SideBarItem title='Delete' {...sharedProps} />
            </List>
        </Drawer>
    )
}

interface SideBarItemProps {
    title: string;
    selected: string;
    setSelected: Function;
}

export function SideBarItem({ title, selected, setSelected }: SideBarItemProps) {

    return (
        <ListItem disablePadding>
            <ListItemButton
                onClick={() => setSelected(title)}
                sx={{
                    backgroundColor: selected === title ? 'grey.500' : 'transparent',
                    '&:hover': {
                        backgroundColor: selected === title ? 'grey.600' : 'action.hover',
                    },
                }}
            >
                <ListItemText primary={title} />
            </ListItemButton>
        </ListItem>
    )
}