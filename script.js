function saveEvent(){

    var events = [];

    var event_name = document.getElementById("event_name");
    var event_category = document.getElementById("event_category");
    var event_weekday = document.getElementById("event_weekday");
    var event_time = document.getElementById("event_time");
    var event_modality = document.getElementById("event_modality");
    var event_location = document.getElementById("event_location");
    var event_link = document.getElementById("event_link");
    var event_attendees = document.getElementById("event_attendees");

    var name = '';
    if(event_name){
        name = event_name.value;
    }
    
    var category = '';
    if(event_category){
        category = event_category.value;
    }
    
    var weekday = '';
    if(event_weekday){
        weekday = event_weekday.value;
    }

    var time = '';
    if(event_time){
        time = event_time.value;
    }

    var modality = '';
    if(event_modality){
        modality = event_modality.value;
    }

    var location = '';
    if(event_location){
        location = event_location.value;
    }

    var link = '';
    if(event_link){
        link = event_link.value;
    }

    var attendees = [];
    if(event_attendees && event_attendees.value !== ''){
        attendees = event_attendees.value.split(',');
    }

    var eventDetails = {
        name: name,
        category: category,
        weekday: weekday,
        time: time,
        modality: modality,
        location: location,
        link: link,
        attendees: attendees
    };

    events.push(eventDetails);

    addEventToCalendarUI(eventDetails);

    const modal = document.getElementById('event_modal');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    if (bootstrapModal) {
        bootstrapModal.hide();
    }

    document.getElementById('event_name').value = '';
    document.getElementById('event_category').value = 'academic';
    document.getElementById('event_weekday').value = 'sunday';
    document.getElementById('event_time').value = '';
    document.getElementById('event_location').value = '';
    if (document.getElementById('event_remote_url')) {
        document.getElementById('event_remote_url').value = '';
    }
    document.getElementById('event_attendees').value = '';

    console.log('Saved Events:', eventDetails);
    console.log('All events:', events);
}

function updateLocationOptions(selectedValue) {
  const inPerson = document.getElementById('in-person-text');
  const remote = document.getElementById('remote-text');
  const remoteInput = document.getElementById('event_remote_url');

  if (selectedValue === 'in-person') {
    inPerson.style.display = 'block';
    remote.style.display = 'none';
    remoteInput.removeAttribute('required');
    remoteInput.value = '';
  } else if (selectedValue === 'remote') {
    inPerson.style.display = 'none';
    remote.style.display = 'block';
    remoteInput.setAttribute('required', 'required');
  } else {
    inPerson.style.display = 'none';
    remote.style.display = 'none';
    remoteInput.removeAttribute('required');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.getElementById('event_modality');
  updateLocationOptions(dropdown.value);
});

function createEventCard(eventDetails) {
  let event_element = document.createElement('div');
  
  event_element.classList = 'event row border rounded m-1 py-1';
  
  if (eventDetails.category === 'academic') {
    event_element.style.backgroundColor = '#299cd9ff';
    event_element.style.borderColor = '#007bff';
  } else if (eventDetails.category === 'work') {
    event_element.style.backgroundColor = '#31b031ff';
    event_element.style.borderColor = '#28a745';
  } else if (eventDetails.category === 'personal') {
    event_element.style.backgroundColor = '#b174d0ff';
    event_element.style.borderColor = '#ac07ffff';
  } else if (eventDetails.category === 'other') {
    event_element.style.backgroundColor = '#cc505bff';
    event_element.style.borderColor = '#dc3545';
  }
  
  let info = document.createElement('div');
  
  let name = eventDetails.name;
  let category = eventDetails.category;
  let weekday = eventDetails.weekday;
  let time = eventDetails.time;
  let modality = eventDetails.modality;
  let location = eventDetails.location;
  let attendees = eventDetails.attendees;
  
  info.innerHTML = `
    <strong>Event Name:</strong><br>
    ${name}<br>
    <strong>Category:</strong><br>
    ${category}<br>
    <strong>Event Time:</strong><br>
    ${time}<br>
    <strong>Event Modality:</strong><br>
    ${modality}<br>
    <strong>Event Location:</strong><br>
    ${location}<br>
    <strong>Attendees:</strong><br>
    ${attendees.join(', ')}
  `;
  
  event_element.appendChild(info);
  
  return event_element;
}

function addEventToCalendarUI(eventInfo) {
  console.log('Adding event to calendar:', eventInfo);
  
  let event_card = createEventCard(eventInfo);
  console.log('Created event card:', event_card);
  
  let dayDiv = document.getElementById(eventInfo.weekday);
  console.log('Found day div:', dayDiv, 'for weekday:', eventInfo.weekday);
  
  if (dayDiv) {
    dayDiv.appendChild(event_card);
    console.log('Successfully added event card to calendar');
  } else {
    console.error('Could not find day div for weekday:', eventInfo.weekday);
  }
}
