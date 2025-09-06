import LoanScreen from '../components/LoanScreen';
import AppLayout from '../components/AppLayout';

export default function LoanPage() {
  return (
    <AppLayout>
      <div className="min-h-screen">
        <LoanScreen />
      </div>
    </AppLayout>
  );
}
