<script lang="ts">
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import Interaction from '@event-calendar/interaction';
	import '@event-calendar/core/index.css';
	import RangeSlider from 'svelte-range-slider-pips';

	// export let data: PageData;

	// $: ( { dbEvents } = data)

	// console.log(dbEvents)

	let ec;

	export let isFree;

	function updateEventAfterUnselect(this) {
		// update the event with new content on unselect
		ec.updateEvent(this);
	}

	let plugins = [Interaction, TimeGrid];
	let options = {
		view: 'timeGridWeek',
		selectable: true,
		slotMinTime: '07:00:00',
		slotMaxTime: '23:00:00',
		slotDuration: '00:15:00',
		editable: true,
		theme: (theme) => {
			theme.today = 'ec-day';
			return theme;
		},
		headerToolbar: { start: '', center: '', end: '' },
		allDaySlot: false,
		dayHeaderFormat: { weekday: 'short' },
		// eventDurationEditable: true,
		// eventStartEditable: true,
		// unselectAuto: true,
		events: [
			// your list of events
		],
		select: function (info) {
			// your select handler
			info.title = prompt('What will your location be for this slot?');

			// TODO: Check that the added event does not overlap with any other events
			// If it does, then alert the user and do not add the event
			// If it does not, then add the event or potentially merge the events

			// info.eventContent = ""
			// info.titleHTML = "<input bind:this.eventContent use:clickOutside on:click_outside={updateEventAfterUnselect()}></input>"
			ec.addEvent(info);

			// update the events in mongodb here

			// console.log(info)

			// prompt the user to enter a title and update the event
			// update the event instead of adding it

			// let title = prompt('Event Title:');
			// if (title) {
			//     ec.addEvent({
			//         title,
			//         start: info.start,
			//         end: info.end,
			//     });
			// }
		},
		// The eventContent should note the duration, location, and timezone, along with a delete button
		// Select background color based on the isFree exported variable. Red if busy and green if not busy
		selectBackgroundColor: isFree ? 'green' : 'red',

		eventContent: function (info) {
			return info.event.display === 'auto'
				? {
						html:
							'<div class="ec-event-time">' +
							info.timeText +
							'</div>' +
							'<Button class="bg-red-50" >x</Button>' +
							'<div class="ec-event-title">' +
							'<b>Location:</b> ' +
							info.event.title +
							'</div>'
				  }
				: '';
		},
		eventClick: function (info) {
			if (info.event.display === 'auto') {
				let btn = info.el.querySelector('button');
				if (info.jsEvent.target === btn) {
					ec.removeEventById(info.event.id);
				}
			}
			// console.log(ec.getEvents())
			// info.event.title = "def";
			// ec.addEvent(info.event)
			// ec.removeEventById(info.event.id)

			let ev = ec.getEvents(); // <-- this is the array of events that we need to update in mongodb, probably on create, if possible?

			console.log(ev);

			// ec.updateEvent(info)
			// console.log(ec.getEvents())

			// console.log(info)
			// your event click handler
			// title = info.event.title
			// info.el.focus()
			// info.event.eventContent = info.event.eventContent
		}
		// unselect: function (info) {
		// 	// your unselect handler

		// 	// update the event with new content on unselect??
		// 	// ec.updateEvent(info)
		// 	// console.log(info);
		// 	let ev = ec.getEvents(); // <-- this is the array of events that we need to update in mongodb, probably on create, if possible?

		// 	console.log(ev);
		// }
		// eventDrop: function (info) {
		// 	// your event drop handler
		// },
		// eventResize: function (info) {
		// 	// your event resize handler
		// }
	};

	// Array of all the hours in a day as strings in 12 hour (ie. 1am,2am,3am) format
	const hours = Array.from(
		{ length: 24 },
		(_, i) => (i % 12 || 12).toString() + ':00' + (i < 12 ? 'am' : 'pm')
	);

	hours.push('11:59pm');

	console.log(hours);

	// Similar to hours but with 24 hour format (ie. 01:00, 02:00, 03:00)
	const hoursFull = Array.from({ length: 24 }, (_, i) => (i < 10 ? '0' + i : i).toString() + ':00');

	hoursFull.push('24:00');

	let values = [7, 23];
</script>

<!-- <input bind:value={title} type="text" class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  " placeholder="">
<h1>Hello {title}!</h1> -->
<div>
	<RangeSlider
		range
		bind:values
		float
		first="label"
		last="label"
		pips
		formatter={(v) => hours[v]}
		min={0}
		max={24}
		on:change={() => {
			ec.setOption('slotMinTime', hoursFull[values[0]]);
			ec.setOption('slotMaxTime', hoursFull[values[1]]);
		}}
	/>
	<p>You can also use the above time slider to limit the range of hours displayed!</p>
	<Calendar bind:this={ec} {plugins} {options} />
</div>

<!-- <div class="grid grid-cols-2">
    <div>
        <input bind:value={title} type="text" class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  " placeholder="">
        <h1>Hello {title}!</h1>
    </div>
    <div class="">
        
    </div>
</div> -->
