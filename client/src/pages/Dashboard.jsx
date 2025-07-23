export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <h1>Dashboard View</h1>
            <p className="subheading">You’ve completed <strong>x/y</strong> tasks today.</p>

            <div className="habit-streaks">
                <div className="habit-box">Habit Streak A: <strong>x</strong> days</div>
                <div className="habit-box">Habit Streak B: <strong>x</strong> days</div>
                <div className="habit-box">Habit Streak C: <strong>x</strong> days</div>
            </div>
        </div>
  );
}