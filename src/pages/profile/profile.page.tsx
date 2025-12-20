
'use client'
import CardInfor from "@/components/ui/card/inforCard";
import { Box } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useRedux";
export default function Profile() {

    const { user } = useAppSelector(state => state.auth)


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                <CardInfor
                    icon={<PersonIcon fontSize="large" sx={{ color: 'rgb(62, 118, 205)' }} />}
                    title="Personal Information"
                    actionLabel="Edit"
                    onActionClick={() => console.log("Edit profile")}
                    items={[
                        { label: "Full Name", value: user?.fullName },
                        { label: "Email Address", value: user?.email },
                        { label: "Phone", value: "---" },
                        { label: "Location", value: "Viet Nam" }
                    ]}
                />
                <CardInfor
                    icon={<AdminPanelSettingsIcon fontSize="large" sx={{ color: 'rgb(62, 118, 205)' }} />}
                    title="Account"
                    items={[
                        { label: "Change Password", value: "a" },
                    ]}
                />
            </Box>
            <CardInfor
                icon={<AssignmentIcon fontSize="large" sx={{ color: 'rgb(62, 118, 205)' }} />}
                title="My tasks"
                items={[
                    { label: "Task 1", value: "ngu ne" },
                ]}
            />

        </Box>
    )
}