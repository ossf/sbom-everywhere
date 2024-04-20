import { createApp } from 'vue'
import App from './App.vue'

import "./global/global.css"
import "primevue/resources/themes/lara-light-teal/theme.css"
import "primevue/resources/primevue.min.css"
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Chip from "primevue/chip";
import Card from "primevue/card";
import InputSwitch from "primevue/inputswitch";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";
import Tooltip from 'primevue/tooltip';
import Tag from "primevue/tag";
import ButtonGroup from "primevue/buttongroup";
import InputIcon from "primevue/inputicon";
import IconField from "primevue/iconfield";

const app = createApp(App);

app.use(PrimeVue)

app.component('p-button', Button)
app.component('p-buttonGroup', ButtonGroup)
app.component("p-dataTable", DataTable)
app.component("p-column", Column)
app.component("p-chip", Chip)
app.component("p-card", Card)
app.component("p-inputSwitch", InputSwitch)
app.component("p-divider", Divider)
app.component('p-inputText', InputText)
app.component('p-iconField', IconField)
app.component('p-inputIcon', InputIcon)

app.component('p-tag', Tag)

app.directive('tooltip', Tooltip);

app.mount('#app')