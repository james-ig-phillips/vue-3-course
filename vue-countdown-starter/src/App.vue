<template>
	<teleport to="#modal">
		<AddUpdateForm
			v-if="showForm"
			@close-form="closeForm()"
			@add-new-event="add($event)"
			@update-event="update($event)"
			:currentEvent="currentEvent"
		/>
	</teleport>
    <div class="options">
		<button @click="showPastEvents = !showPastEvents">show past events</button>
		<button class="addNew" @click="showForm = !showForm">&#43;</button>
    </div>
    <ul>
        <li v-for="event in orderEvents" :key="event.id" @click="setForm(event)">
            <Event
				:event="event" 
				:daysLeft="daysLeft(event)" 
				:showPastEvents="showPastEvents"
				@remove-event="remove($event)"
			/>
        </li>
    </ul>

</template>

<script>
const eventData = [
  {
    id: 1,
    name: "Graduation",
    details: "wooohoo!!!",
    date: "2021-09-25",
    background: "#F34949",
  },
  {
    id: 2,
    name: "Holidays",
    details: "wooohoo!!!",
    date: "2022-12-30",
    background: "#f9f970",
  },
  {
    id: 3,
    name: "HolidayYYYY",
    details: "Get me outta here!",
    date: "2021-12-18",
    background: "#7AD3F0",
  },
  {
    id: 4,
    name: "Birthday",
    details: "My birthday party",
    date: "2021-12-19",
    background: "#F07AEC",
  },
  {
    id: 5,
    name: "Christmas",
    details: "ho ho ho",
    date: "2021-12-25",
    background: "#EB9A0F",
  },
  {
    id: 6,
    name: "Conference Talk",
    details: "dont flop",
    date: "2022-02-28",
    background: "#68EE94",
  },
];

import Event from './components/Event.vue';
import AddUpdateForm from './components/AddUpdateForm.vue';

export default {
    name: 'App',
    components: {
        Event,
		AddUpdateForm
    },
    data() {
        return {
            events: eventData,
            showPastEvents: true,
			showForm: false,
			currentEvent: {},
        }
    },
    methods: {
		findEventIndex(id) {
			return this.events.findIndex((el) => el.id === id);
		},
		remove(event) {
			this.events.splice(this.findEventIndex(event.id), 1);
		},
		closeForm() {
			this.showForm = false;
			this.currentEvent = {};
		},
		update(event) {
			this.events[this.findEventIndex(event.id)] = event;
		},
		setForm(event) {
			this.currentEvent = event || {};
			this.showForm = true;
		},
		add(event) {
			event.id = this.events.length + 1;
			this.events.push(event);
		},
        daysLeft(event) {
            const Time = Date.parse(event.date) - Date.now();
            const Days = Math.ceil(Time / (1000 * 3600 * 24));
            return Days;
        }
    },
    computed: {
        orderEvents() {
			const eventsToOrder = this.events
			return eventsToOrder.sort((a, b) => a.date > b.date ? 1 : -1);
		}
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
}

ul {
    padding: 0;
}

li {
    list-style: none;
    cursor: pointer;
}
</style>
