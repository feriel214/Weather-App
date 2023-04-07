import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import { noCase } from 'change-case';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: faker.name.fullName(),
    description: 'answered to your comment on the Minimal',
    avatar: '/assets/images/avatars/avatar_2.jpg',
    type: 'friend_interactive',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatar: null,
    type: 'mail',
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
];

export default function NotificationsPopover() {

  const [notif,setNotif] = useState({});
  const [country,setCountry] = useState("Rome");
  const [allNotif,setAllNotif]= useState([])
 const location = useLocation();
 const {userCountry} = location.state || "Rome";
 
  const getData = () => {
    if( userCountry.length > 0 ) {
      axios.get(`http://localhost:5002/notif/${userCountry}`).then((res)=>{
        console.log("---------------*-------------------",res.data)
        setNotif(res.data);
        setAllNotif([...allNotif,res.data.Notification])
        console.log("all notif:",allNotif)
    }).catch((err)=>{
            console.log(err)
    })
    } else{
      axios.get(`http://localhost:5002/notif/${country}`).then((res)=>{
        console.log("---------------*-------------------",res.data)
        setNotif(res.data);
        setAllNotif([...allNotif,res.data.Notification])
        console.log("all notif:",allNotif)
    }).catch((err)=>{
            console.log(err)
    })
    }
     
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getData()
    }, 10000);
    return () => clearInterval(interval);
  }, [allNotif])
  console.log("notif : ",notif)

  /*useEffect(() => {
      const interval = setInterval(() => {
        getData()
      }, 3000);
      return () => clearInterval(interval);
    }, []);*/

   
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  //const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };
 //console.log("notifications : ",notifications)
  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={allNotif.length && allNotif.length} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {allNotif.length} unread messages
            </Typography>
          </Box>

          {/* {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )} */}
                     

        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
           
          >
         {   allNotif.length > 0 && allNotif.length <= 10  && allNotif.map((el,index)=>
          (<NotificationItem key={index}  notification={el} />)
         )
           
         }
          </List>

      
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

      
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
 console.log("COUNTRY : ",notification)

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
     
  {notification && (
    <>
    {notification.temperature.length <= 4  ?
   <></> :   <ListItemText style={{fontSiz : '5px'}}
   primary={notification.temperature}
   secondary={
     <Typography
     style={{fontSiz : '5px'}}
       variant="caption"
       sx={{
         mt: 0.5,
         display: 'flex',
         alignItems: 'start',
         color: 'text.disabled',
       }}
     >
     </Typography>
   }
 />}
       
      <ListItemText
      primary={notification.Country}
      secondary={
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'start',
            color: 'text.disabled',
            fontSize : '5px'
          }}
        >
          <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
          {fToNow(notification.createdAt)}
        </Typography>
      }
    />
    {notification.pressure.length <= 4  ? 
  <></>  :<ListItemText
    primary={notification.pressure}
    secondary={
      <Typography
        variant="caption"
        sx={{
          mt: 0.5,
          display: 'flex',
          alignItems: 'start',
          color: 'text.disabled',
        }}
      >
        <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
        {fToNow(notification.createdAt)}
      </Typography>
    }
  /> }
     
    {notification.humidity.length > 4  ?
     <ListItemText
     primary={ notification.humidity}
     secondary={
       <Typography
         variant="caption"
         sx={{
           mt: 0.5,
           display: 'flex',
           alignItems: 'start',
           color: 'text.disabled',
         }}
       >
         <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
         {fToNow(notification.createdAt)}
       </Typography>
     }
   />
   
    : <></>}
    
    
    </>
  )}
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_package.svg" />,
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
