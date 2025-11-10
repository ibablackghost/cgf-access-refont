import { Bell } from 'lucide-react'

const NotificationsWidget = () => {
  const notifications = [
    { id: 1, message: 'Nouvelle transaction sur SONATEL', time: 'Il y a 5 min', type: 'info' },
    { id: 2, message: 'Alerte: BRVM Composite en hausse de 2%', time: 'Il y a 15 min', type: 'success' },
    { id: 3, message: 'Mise à jour des cours disponible', time: 'Il y a 1h', type: 'info' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <Bell className="text-primary" size={24} />
        <h3 className="text-lg font-semibold text-primary">Notifications</h3>
      </div>
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div key={notif.id} className="p-3 bg-gray-50 rounded-lg border-l-4 border-primary">
            <p className="text-sm text-gray-700">{notif.message}</p>
            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationsWidget
