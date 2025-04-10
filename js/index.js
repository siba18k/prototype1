        // DOM Elements
        const signInBtn = document.getElementById('signInBtn');
        const getStartedBtn = document.getElementById('getStartedBtn');
        const authModal = new bootstrap.Modal(document.getElementById('authModal'));
        const scanBtn = document.getElementById('scanBtn');
        const barcodeInput = document.getElementById('barcodeInput');
        const scanResult = document.getElementById('scanResult');
        const refreshHistoryBtn = document.getElementById('refreshHistoryBtn');
        const historyItemsContainer = document.getElementById('historyItemsContainer');
        const achievementsContainer = document.getElementById('achievementsContainer');
        const leaderboardContainer = document.getElementById('leaderboardContainer');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const timeframeDropdown = document.getElementById('timeframeDropdown');
        
        // Mock user data (in a real app, this would come from an API)
        let userData = {
            isAuthenticated: false,
            points: 2345,
            weeklyPoints: 120,
            itemsRecycled: 87,
            recycledTypes: ['Plastic', 'Glass', 'Aluminum'],
            co2Saved: 124,
            treesEquivalent: 5,
            achievements: [
                { id: 1, name: 'Green Starter', description: 'Recycled first 10 items', icon: 'leaf', earned: true },
                { id: 2, name: 'Eco Warrior', description: 'Saved equivalent of 5 trees', icon: 'tree', earned: true },
                { id: 3, name: 'Global Impact', description: 'Reduced 100kg CO2', icon: 'globe', earned: true },
                { id: 4, name: 'Plastic Crusher', description: 'Recycled 50 plastic items', icon: 'recycle', earned: false },
                { id: 5, name: 'Sustainability Champion', description: 'Top 10 on leaderboard', icon: 'trophy', earned: false }
            ],
            history: [
                { id: 1, type: 'Glass Bottle', points: 10, date: '2023-06-15' },
                { id: 2, type: 'Plastic Bottle', points: 5, date: '2023-06-14' },
                { id: 3, type: 'Aluminum Can', points: 7, date: '2023-06-12' },
                { id: 4, type: 'Paper', points: 3, date: '2023-06-10' },
                { id: 5, type: 'Glass Bottle', points: 10, date: '2023-06-08' }
            ]
        };
        
        // Mock leaderboard data
        const leaderboardData = {
            week: [
                { id: 1, name: 'Sarah Johnson', major: 'Computer Science', points: 245, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                { id: 2, name: 'Mike Rodriguez', major: 'Environmental Studies', points: 210, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
                { id: 3, name: 'Emily Chen', major: 'Biology', points: 187, avatar: 'https://randomuser.me/api/portraits/women/63.jpg' }
            ],
            month: [
                { id: 1, name: 'Sarah Johnson', major: 'Computer Science', points: 1345, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                { id: 2, name: 'Mike Rodriguez', major: 'Environmental Studies', points: 1210, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
                { id: 3, name: 'Emily Chen', major: 'Biology', points: 987, avatar: 'https://randomuser.me/api/portraits/women/63.jpg' }
            ],
            year: [
                { id: 1, name: 'Sarah Johnson', major: 'Computer Science', points: 3452, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                { id: 2, name: 'Mike Rodriguez', major: 'Environmental Studies', points: 3210, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
                { id: 3, name: 'Emily Chen', major: 'Biology', points: 2987, avatar: 'https://randomuser.me/api/portraits/women/63.jpg' }
            ],
            all: [
                { id: 1, name: 'Sarah Johnson', major: 'Computer Science', points: 8452, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                { id: 2, name: 'Mike Rodriguez', major: 'Environmental Studies', points: 7210, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
                { id: 3, name: 'Emily Chen', major: 'Biology', points: 6987, avatar: 'https://randomuser.me/api/portraits/women/63.jpg' }
            ]
        };
        
        // Current timeframe for leaderboard
        let currentTimeframe = 'month';
        
        // Event Listeners
        signInBtn.addEventListener('click', () => authModal.show());
        getStartedBtn.addEventListener('click', () => {
            document.getElementById('signup-tab').click();
            authModal.show();
        });
        
        scanBtn.addEventListener('click', handleScan);
        refreshHistoryBtn.addEventListener('click', loadHistory);
        document.querySelectorAll('[data-timeframe]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                currentTimeframe = e.target.getAttribute('data-timeframe');
                timeframeDropdown.innerHTML = `<i class="fas fa-calendar-alt me-2"></i>${e.target.textContent}`;
                loadLeaderboard();
            });
        });
        
        // Form submissions
        document.getElementById('signinForm').addEventListener('submit', handleSignIn);
        document.getElementById('signupForm').addEventListener('submit', handleSignUp);
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            updateStats();
            loadHistory();
            loadAchievements();
            loadLeaderboard();
        });
        
        // Functions
        function showLoading(show) {
            loadingSpinner.style.display = show ? 'flex' : 'none';
        }
        
        function updateStats() {
            document.getElementById('totalPoints').textContent = userData.points.toLocaleString();
            document.getElementById('weeklyPoints').textContent = userData.weeklyPoints;
            document.getElementById('itemsRecycled').textContent = userData.itemsRecycled;
            document.getElementById('recycledTypes').textContent = userData.recycledTypes.join(', ');
            document.getElementById('co2Saved').textContent = `${userData.co2Saved} kg`;
            document.getElementById('treesEquivalent').textContent = userData.treesEquivalent;
        }
        
        function loadHistory() {
            showLoading(true);
            // Simulate API call
            setTimeout(() => {
                historyItemsContainer.innerHTML = '';
                if (userData.history.length === 0) {
                    historyItemsContainer.innerHTML = `
                        <div class="text-center py-5">
                            <i class="fas fa-recycle fa-3x text-muted mb-3"></i>
                            <p>No recycling history yet</p>
                            <button class="btn btn-success">Scan your first item</button>
                        </div>
                    `;
                } else {
                    userData.history.forEach(item => {
                        const icon = getItemIcon(item.type);
                        const date = new Date(item.date).toLocaleDateString();
                        
                        const historyItem = document.createElement('div');
                        historyItem.className = 'history-card';
                        historyItem.innerHTML = `
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-${icon} text-success me-3"></i>
                                    ${item.type}
                                    <small class="d-block text-muted">${date}</small>
                                </div>
                                <div class="text-success">+${item.points} Points</div>
                            </div>
                        `;
                        historyItemsContainer.appendChild(historyItem);
                    });
                }
                showLoading(false);
            }, 800);
        }
        
        function loadAchievements() {
            showLoading(true);
            // Simulate API call
            setTimeout(() => {
                achievementsContainer.innerHTML = '';
                userData.achievements.slice(0, 3).forEach(achievement => {
                    const achievementElement = document.createElement('div');
                    achievementElement.className = `col-md-4 achievement-badge ${achievement.earned ? '' : 'locked'}`;
                    achievementElement.innerHTML = `
                        <i class="fas fa-${achievement.icon} fa-3x ${achievement.earned ? 'text-success' : 'text-muted'} mb-3"></i>
                        <h4>${achievement.name}</h4>
                        <p>${achievement.description}</p>
                        ${achievement.earned ? '<small class="text-success"><i class="fas fa-check-circle"></i> Earned</small>' : '<small class="text-muted">Locked</small>'}
                    `;
                    achievementsContainer.appendChild(achievementElement);
                });
                showLoading(false);
            }, 800);
        }
        
        function loadLeaderboard() {
            showLoading(true);
            // Simulate API call
            setTimeout(() => {
                leaderboardContainer.innerHTML = '';
                const data = leaderboardData[currentTimeframe];
                
                data.forEach((user, index) => {
                    const leaderboardItem = document.createElement('div');
                    leaderboardItem.className = 'leaderboard-item';
                    leaderboardItem.innerHTML = `
                        <img src="${user.avatar}" alt="${user.name}">
                        <div class="flex-grow-1">
                            <strong>${user.name}</strong>
                            <small class="d-block text-muted">${user.major}</small>
                        </div>
                        <div class="text-success">${user.points} Points</div>
                    `;
                    leaderboardContainer.appendChild(leaderboardItem);
                });
                showLoading(false);
            }, 800);
        }
        
        function handleScan() {
            const barcode = barcodeInput.value.trim();
            
            if (!barcode) {
                scanResult.innerHTML = `
                    <div class="alert alert-warning">
                        Please enter a barcode or use the camera to scan
                    </div>
                `;
                scanResult.style.display = 'block';
                return;
            }
            
            showLoading(true);
            // Simulate API call
            setTimeout(() => {
                // Random item types for demo
                const itemTypes = ['Glass Bottle', 'Plastic Bottle', 'Aluminum Can', 'Paper', 'Cardboard'];
                const randomType = itemTypes[Math.floor(Math.random() * itemTypes.length())];
                const points = randomType === 'Glass Bottle' ? 10 : 
                              randomType === 'Plastic Bottle' ? 5 : 
                              randomType === 'Aluminum Can' ? 7 : 3;
                
                // Update user data
                userData.points += points;
                userData.weeklyPoints += points;
                userData.itemsRecycled += 1;
                userData.co2Saved += points * 0.5; // 0.5kg CO2 per point
                userData.treesEquivalent = Math.floor(userData.co2Saved / 25); // 25kg CO2 per tree
                userData.history.unshift({
                    id: Date.now(),
                    type: randomType,
                    points: points,
                    date: new Date().toISOString().split('T')[0]
                });
                
                // Update UI
                updateStats();
                loadHistory();
                
                // Show success message
                scanResult.innerHTML = `
                    <div class="alert alert-success">
                        <i class="fas fa-check-circle me-2"></i>
                        Success! You recycled a ${randomType} and earned ${points} points!
                    </div>
                `;
                scanResult.style.display = 'block';
                barcodeInput.value = '';
                
                showLoading(false);
            }, 1500);
        }
        
        function handleSignIn(e) {
            e.preventDefault();
            const email = document.getElementById('signinEmail').value;
            const password = document.getElementById('signinPassword').value;
            
            showLoading(true);
            // Simulate API call
            setTimeout(() => {
                userData.isAuthenticated = true;
                authModal.hide();
                showLoading(false);
                
                // Update UI for authenticated user
                signInBtn.style.display = 'none';
                getStartedBtn.textContent = 'My Account';
                getStartedBtn.classList.remove('btn-primary');
                getStartedBtn.classList.add('btn-outline-light');
                
                // Show welcome message
                const scanResult = document.getElementById('scanResult');
                scanResult.innerHTML = `
                    <div class="alert alert-success">
                        <i class="fas fa-check-circle me-2"></i>
                        Welcome back! You're now signed in.
                    </div>
                `;
                scanResult.style.display = 'block';
            }, 1500);
        }
        
        function handleSignUp(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            showLoading(true);
            // Simulate API call
            setTimeout(() => {
                userData.isAuthenticated = true;
                authModal.hide();
                showLoading(false);
                
                // Update UI for authenticated user
                signInBtn.style.display = 'none';
                getStartedBtn.textContent = 'My Account';
                getStartedBtn.classList.remove('btn-primary');
                getStartedBtn.classList.add('btn-outline-light');
                
                // Show welcome message
                const scanResult = document.getElementById('scanResult');
                scanResult.innerHTML = `
                    <div class="alert alert-success">
                        <i class="fas fa-check-circle me-2"></i>
                        Welcome to Adbeam, ${name}! You're now signed up.
                    </div>
                `;
                scanResult.style.display = 'block';
            }, 1500);
        }
        
        function getItemIcon(itemType) {
            switch(itemType) {
                case 'Glass Bottle': return 'wine-bottle';
                case 'Plastic Bottle': return 'glass-whiskey';
                case 'Aluminum Can': return 'beer';
                case 'Paper': return 'file-alt';
                case 'Cardboard': return 'box';
                default: return 'recycle';
            }
        }