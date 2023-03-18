<script lang="ts">
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import Interaction from '@event-calendar/interaction';
	import '@event-calendar/core/index.css';
	import RangeSlider from 'svelte-range-slider-pips';

	let ec;

	export let isFree: boolean;

	let plugins = [Interaction, TimeGrid];
	let options = {
		view: 'timeGridWeek',
		selectable: true,
		slotMinTime: '08:00:00',
		slotMaxTime: '17:00:00',
		slotDuration: '00:15:00',
		editable: true,
		theme: (theme) => {
			theme.today = 'ec-day';
			return theme;
		},
		headerToolbar: { start: '', center: '', end: '' },
		allDaySlot: false,
		dayHeaderFormat: { weekday: 'short' },

		events: [
			// your list of events
		],
		select: function (info) {
			// #TimeBlock #Location
			info.title = prompt('What will your location be for this slot?');

			// Select background color based on the isFree exported variable. Red if busy and green if not busy
			// #TimeBlock #Free/Busy Block
			info.backgroundColor = isFree ? '#54AD56' : '#bd5757';

			// console.log(info.event.backgroundColor);
			// info.eventContent = ""
			// info.titleHTML = "<input bind:this.eventContent use:clickOutside on:click_outside={updateEventAfterUnselect()}></input>"
			ec.addEvent(info);
		},

		// #TimeBlock #Location #TimeRange
		eventContent: function (info) {
			if (info.event.display !== 'auto') {
				return '';
			}
			// The eventContent should note the duration, location, and timezone, along with a delete button
			// Select background color based on the isFree exported variable. Red if busy and green if not busy
			let locationText = info.event.title ? '<b>Location:</b> ' + info.event.title : '';
			return {
				html:
					'<div class="ec-event-time">' +
					info.timeText +
					'</div>' +
					'<Button class="bg-red-50" >x</Button>' +
					'<div class="ec-event-title">' +
					locationText +
					'</div>'
			};
		},
		eventClick: function (info) {
			// #TimeBlock #Delete
			// Delete a block
			if (info.event.display === 'auto') {
				let btn = info.el.querySelector('button');
				if (info.jsEvent.target === btn) {
					ec.removeEventById(info.event.id);
				}
			}

			let ev = ec.getEvents();

			console.log(ev);
		}
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

	let values = [8, 17];
</script>

<!-- #Blockable time range slider -->
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
	<p>
		Enter your schedule as (time + location) blocks on the calendar. You can mark a slot as free or
		busy, whatever's easier.
	</p>
	<Calendar bind:this={ec} {plugins} {options} />
</div>
