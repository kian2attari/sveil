<script lang="ts">
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import Interaction from '@event-calendar/interaction';
    import '@event-calendar/core/index.css';
	import { clickOutside } from '../../helpers/clickOutside';
    let title = ""
    let ec;

    function updateEventAfterUnselect(this) {
        // update the event with new content on unselect
        ec.updateEvent(this)
    }

    let plugins = [Interaction, TimeGrid];
    let options = {
        view: 'timeGridWeek',
        selectable: true,
        slotDuration: '00:15:00',
        editable: true,
        height: 'fit-content(50vh) !important',
        // eventDurationEditable: true,
        // eventStartEditable: true,
        // unselectAuto: true,
        events: [
            // your list of events
        ],
        select: function (info) {
            // your select handler
            info.title = prompt('Event Title:');
            // info.eventContent = ""
            // info.titleHTML = "<input bind:this.eventContent use:clickOutside on:click_outside={updateEventAfterUnselect()}></input>"
            ec.addEvent(info)
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
        eventClick: function (info) {
            info.el.focus()
            info.event.title = prompt('Event Title:');
            ec.updateEvent(info)
            // console.log(info)
            // your event click handler
            // title = info.event.title
            // info.el.focus()
            // info.event.eventContent = info.event.eventContent
        },
        unselect: function (info) {
            // your unselect handler

            // update the event with new content on unselect
            // ec.updateEvent(info)
            console.log(info)

        },
        eventDrop: function (info) {
            // your event drop handler
        },
        eventResize: function (info) {
            // your event resize handler
        },
    };
</script>

<input bind:value={title} type="text" class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  " placeholder="">
<h1>Hello {title}!</h1>

<Calendar bind:this={ec} {plugins} {options} />


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