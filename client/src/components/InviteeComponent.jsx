import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import WeeklyView from './WeeklyView';
import CustomUser from './CustomUser';
import DisplayArea from './DisplayArea';

const InviteeComponent = () => {
  const colors = [
    '#ececec', // Light Gray (Base: First Color)
    '#c7c7c7', // Medium Gray (Tint of First Color)
    '#9fd3c7', // Light Teal (Base: Second Color)
    '#76b0a1', // Medium Teal (Shade of Second Color)
    '#385170', // Dark Blue-Gray (Base: Third Color)
    '#2c3f56', // Deeper Blue-Gray (Shade of Third Color)
    '#142d4c', // Navy Blue (Base: Fourth Color)
    '#0f2339', // Darker Navy (Shade of Fourth Color)
    '#e3e7e8', // Lighter Gray (Tint of First Color)
    '#6a7b82', // Medium Blue-Gray (Tint of Third Color)
  ];
  // You'll need to manage state and functions similar to those in MainComponent
  // or find a way to share them between components
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [organizerName, setOrganizerName] = useState('');
  const [meetingName, setMeetingName] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [meetingLocation, setMeetingLocation] = useState('');
  const [userColor, setUserColor] = useState(colors[0]);
  const [userName, setUserName] = useState('');
  const [generatedLink, setGeneratedLink] = useState(null);
  const [eventId, setEventId] = useState('')
  const [userAvailabilities, setUserAvailabilities] = useState([]);

  const {link} = useParams();

  // fetches data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://rendezview-server.vercel.app/api/availability/${link}`); // MUST CHANGE LINK TO WHATEVER SERVER IS BEING HOSTED ON
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const {
          organizer_name,
          meeting_name,
          meeting_description,
          location,
          date_start,
          date_end,
          event_id,
        } = data.eventDetails;
        console.log("fetch response: ", data);
        // Update your state based on the fetched data
        setStartDate(date_start);
        setEndDate(date_end);
        setOrganizerName(organizer_name);
        setMeetingName(meeting_name);
        setMeetingDescription(meeting_description);
        setMeetingLocation(location);
        setStartDate(date_start);
        setEndDate(date_end);
        setEventId(event_id);
        setUserAvailabilities(data.userAvailabilities)
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='mainContainer'>
      <div className='leftContainer'>
        <div>
          <WeeklyView
            startDate={startDate}
            endDate={endDate}
            userColor={userColor}
            userName={userName}
            organizerName={organizerName}
            meetingName={meetingName}
            meetingLocation={meetingLocation}
            meetingDescription={meetingDescription}
            generatedLink={generatedLink}
            setGeneratedLink={setGeneratedLink}
            eventId={eventId}
            isOrganizer={false}
            userAvailabilities={userAvailabilities}
          />
        </div>
      </div>
      <div className='rightContainer'>
        <DisplayArea
          organizerName={organizerName}
          meetingName={meetingName}
          meetingDescription={meetingDescription}
          meetingLocation={meetingLocation}
          generatedLink={`https://rendezview.vercel.app/availability/${link}`} // change this when site is hosted
        />
        <hr />
        <CustomUser
          userName={userName}
          setUserName={setUserName}
          userColor={userColor}
          setUserColor={setUserColor}
        />
      </div>
    </div>
  );
};

export default InviteeComponent;
