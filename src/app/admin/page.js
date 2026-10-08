import TotalRevenueCard from './components/TotalRevenueCard';
import OrderSummaryCard from './components/OrderSummaryCard';
import AvgOrderValueCard from './components/AvgOrderValueCard';
import DeliveryFeesCard from './components/DeliveryFeesCard';
import CancellationRateCard from './components/CancellationRateCard';
import RevenueChart from './components/RevenueChart';
import OrderStatusPieChart from './components/OrderStatusPieChart';
import TopBooksCard from './components/TopBooksCard';
import OffersPerformanceCard from './components/OffersPerformanceCard';
import PendingAgingCard from './components/PendingAgingCard';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-2xl text-glow mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <TotalRevenueCard />
        <OrderSummaryCard />
        <AvgOrderValueCard />
        <DeliveryFeesCard />
        <CancellationRateCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <OrderStatusPieChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TopBooksCard />
        <OffersPerformanceCard />
        <PendingAgingCard />
      </div>
    </div>
  );
}