import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography
} from "@mui/material"

type InfoItem = {
    label: string;
    value: React.ReactNode;
};

type CardInforProps = {
    icon?: React.ReactNode;
    title: string;
    items: InfoItem[];
    actionLabel?: string;
    onActionClick?: () => void;
};

function CardInfor({
    icon,
    title,
    items,
    actionLabel,
    onActionClick
}: CardInforProps) {
    return (
        <Card sx={{ flex: 1, backgroundColor: 'rgb(29, 41, 57)', color: 'white', borderRadius: 5 }}>
            <CardHeader
                avatar={icon}
                title={
                    <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>
                        {title}
                    </Typography>
                }
                action={
                    actionLabel && (
                        <Typography
                            onClick={onActionClick}
                            sx={{
                                color: 'rgb(62, 118, 205)',
                                fontSize: 16,
                                p: 1,
                                cursor: 'pointer'
                            }}
                        >
                            {actionLabel}
                        </Typography>
                    )
                }
            />
            <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    {
                        items.map((i, index) => (
                            <Grid size={12} key={index}>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    display="block"
                                    sx={{
                                        color: 'rgb(114, 147, 184)'
                                    }}
                                >
                                    {i.label}
                                </Typography>
                                <Typography variant="body2" fontWeight="medium">
                                    {i.value || "--"}
                                </Typography>
                            </Grid>
                        ))
                    }
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CardInfor