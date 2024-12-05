import axios from 'axios'

const BASE_URL = 'http://localhost:9000'

export interface Widget {
  description: string
  name: string
  price: number
}

// Fetch all widgets
export const fetchAllWidgets = (): Promise<Widget[]> => 
  axios.get(`${BASE_URL}/v1/widgets`).then((response) => response.data)

// Create a new widget
export const createWidget = (widget: Widget): Promise<Widget> => 
  axios.post(`${BASE_URL}/v1/widgets`, widget).then((response) => response.data)

// Update an existing widget by name (used as ID)
export const updateWidget = (widget: Widget): Promise<Widget> => 
  axios.put(`${BASE_URL}/v1/widgets/${widget.name}`, widget).then((response) => response.data)

// Find a widget by name
export const findWidget = (name: string): Promise<Widget | null> => 
  axios.get(`${BASE_URL}/v1/widgets/${name}`).then((response) => response.data).catch(() => null)

// Delete a widget by name
export const deleteWidget = (name: string): Promise<void> => 
  axios.delete(`${BASE_URL}/v1/widgets/${name}`).then(() => {})