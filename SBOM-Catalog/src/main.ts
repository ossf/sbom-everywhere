import { createApp } from 'vue'
import { createPinia } from 'pinia'
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
import router from "./router";

const app = createApp(App);
app.use(createPinia())

app.use(PrimeVue)
app.use(router)

app.component('PButton', Button)
app.component('PButtonGroup', ButtonGroup)
app.component("PDataTable", DataTable)
app.component("PColumn", Column)
app.component("PChip", Chip)
app.component("PCard", Card)
app.component("PInputSwitch", InputSwitch)
app.component("PDivider", Divider)
app.component('PInputText', InputText)
app.component('PIconField', IconField)
app.component('PInputIcon', InputIcon)

app.component('PTag', Tag)

app.directive('tooltip', Tooltip);

app.mount('#app')