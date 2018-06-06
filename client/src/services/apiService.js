import api from './api';
import stubs from './stubs';
import settingsService from './settingsService';

export default settingsService.useStubs ? stubs : api;