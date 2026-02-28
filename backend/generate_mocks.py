import random

vessel_names = ["Ocean Explorer", "Deep Sea Voyager", "R/V Sally Ride", "R/V Falkor (too)", "Nautilus", "Alucia", "Polarstern", "Sonne", "Meteor", "Atlantis"]
operators = ["Scripps", "Woods Hole", "NOAA", "Schmidt Ocean", "University of Washington", "Greenwater Foundation", "JAMSTEC"]
regions = ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Southern Ocean", "Mediterranean Sea", "Global", "Bering Sea"]
ports = ["San Diego, USA", "Seattle, USA", "Woods Hole, USA", "Honolulu, USA", "Palo Alto, USA", "Miami, USA", "Bremen, Germany", "Tokyo, Japan"]
all_equipment = ["Deep-sea ROV (Jason/Medea)", "A-Frame", "Hydrographic Winch", "4,000m Depth Capability", "High-bandwidth Satellite", "ROV/AUV Deck Space", "Multibeam Echosounder", "4,500m ROV (SuBastian)", "High-performance Analytical Labs", "Full Ocean Depth Multibeam"]

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Greenwater Foundation - Mock Vessel Registry</title>
</head>
<body>
    <h1>Active Research Vessel Fleet</h1>
    <div class="vessel-list">
"""

for i in range(1, 101):
    name = f"{random.choice(vessel_names)} {i}"
    operator = random.choice(operators)
    port = random.choice(ports)
    region = random.choice(regions)
    equipment = ", ".join(random.sample(all_equipment, random.randint(3, 6)))
    desc = f"Mock vessel {i} capable of various oceanographic tasks."
    
    html_content += f"""
        <article class="vessel-entry">
            <h2>{name}</h2>
            <p><strong>Operator:</strong> {operator}</p>
            <p><strong>Home Port:</strong> {port}</p>
            <p><strong>Current Operating Region:</strong> {region}</p>
            <p><strong>Available Equipment:</strong> {equipment}</p>
            <p><strong>Description:</strong> {desc}</p>
        </article>
"""

html_content += """
    </div>
</body>
</html>
"""

with open("registry.html", "w") as f:
    f.write(html_content)

print("Generated registry.html with 100 mock records.")
