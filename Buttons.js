document.addEventListener('DOMContentLoaded', function() {
    // توابع مورد نظر را تعریف کنید
    function refreshGame() {
        currentEnergy = initialEnergy;
        coinCount = 0;
        document.getElementById('coin-count').textContent = coinCount;
        document.getElementById('current-energy').textContent = currentEnergy;
        updateEnergyBar();
        alert('Game has been refreshed!');
    }

    function showTasks() {
        alert("Complete tasks to earn extra coins and bonuses!");
    }

    function activateBoost() {
        alert("Boost activated! Double coins for 30 seconds!");
    }

    function showStats() {
        const username = "currentUsername"; // باید با نام کاربری فعلی جایگزین شود
        fetch('getReferrals.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        })
        .then(response => response.json())
        .then(data => {
            const referrals = data.referrals;
            alert(`Your referrals: ${referrals.join(', ')}`);
        })
        .catch(error => console.error('Error:', error));
    }

    function generateReferralLink() {
        const username = "currentUsername"; // باید با نام کاربری فعلی جایگزین شود
        fetch('generateReferralLink.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        })
        .then(response => response.json())
        .then(data => {
            const referralLink = data.referralLink;
            alert(`Your referral link is: ${referralLink}`);
            const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent("Join this awesome game using my referral link!")}`;
            window.open(telegramLink, '_blank');
        })
        .catch(error => console.error('Error:', error));
    }

    // اتصال Event Listeners به دکمه‌ها
    document.getElementById('refButton').addEventListener('click', generateReferralLink);
    document.getElementById('taskButton').addEventListener('click', showTasks);
    document.getElementById('boostButton').addEventListener('click', activateBoost);
    document.getElementById('statsButton').addEventListener('click', showStats);
});
