$apiBase = "https://touristy.runasp.net"
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTk1MDkxMn0.tlSlVDTYaFJlltjqX4_GLNUtYc0E6BBfu9q87NHldBY"

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

Write-Host "========================================"
Write-Host "Starting Hotel Creation Process"
Write-Host "========================================"

# Hotel 1: Red Sea Reef Resort
$hotel1 = @{
    name = @{
        en = "Red Sea Reef Resort"
        fr = "Resort Récif de la Mer Rouge"
        ru = "Курорт Коралловый Риф"
        ro = "Resort Recif Marea Rosie"
        it = "Resort Reef del Mar Rosso"
    }
    location = @{
        en = "Hurghada, Red Sea"
        fr = "Hurghada, Mer Rouge"
        ru = "Хургада, Красное море"
        ro = "Hurghada, Marea Rosie"
        it = "Hurghada, Mar Rosso"
    }
    description = @{
        en = "Luxury beachfront resort with direct Red Sea access, featuring pristine coral reefs, multiple swimming pools, and world-class diving facilities."
        fr = "Resort de luxe en bord de mer avec accès direct à la Mer Rouge, offrant des récifs coralliens immaculés."
        ru = "Роскошный пляжный курорт с прямым выходом к Красному морю, с нетронутыми коралловыми рифами."
        ro = "Resort de lux pe plajă cu acces direct la Marea Roșie, cu recife coraline nealterate."
        it = "Resort di lusso sulla spiaggia con accesso diretto al Mar Rosso, con barriere coralline incontaminate."
    }
    rate = 5
    facilities = @(
        @{
            name = @{ en = "Private Beach"; fr = "Plage Privée"; ru = "Частный пляж"; ro = "Plajă Privată"; it = "Spiaggia Privata" }
            values = @(@{ en = "Direct Beach Access"; fr = "Accès direct"; ru = "Прямой доступ"; ro = "Acces direct"; it = "Accesso diretto" })
            icon = "beach-umbrella"
            order = 1
        }
        @{
            name = @{ en = "Diving Center"; fr = "Centre de Plongée"; ru = "Дайвинг центр"; ro = "Centru Scufundări"; it = "Centro Immersioni" }
            values = @(@{ en = "PADI Certified"; fr = "Certifié PADI"; ru = "Сертификат PADI"; ro = "Certificat PADI"; it = "Certificato PADI" })
            icon = "scuba-diving"
            order = 2
        }
    )
} | ConvertTo-Json -Depth 10

Write-Host "`nCreating Hotel 1: Red Sea Reef Resort..."
try {
    $response = Invoke-RestMethod -Uri "$apiBase/api/Hotels" -Method Post -Headers $headers -Body $hotel1
    $hotel1Id = $response.data.id
    Write-Host "✓ Hotel 1 created with ID: $hotel1Id" -ForegroundColor Green
    
    # Create rate plans for Hotel 1
    $ratePlan1 = @{
        hotelId = $hotel1Id
        name = @{ en = "All-Inclusive Package"; fr = "Forfait Tout Compris"; ru = "Все Включено"; ro = "Pachet All-Inclusive"; it = "Pacchetto All-Inclusive" }
        description = @{ en = "Full board with unlimited drinks"; fr = "Pension complète"; ru = "Полный пансион"; ro = "Pensiune completă"; it = "Pensione completa" }
    } | ConvertTo-Json -Depth 10
    
    Invoke-RestMethod -Uri "$apiBase/api/RatePlans" -Method Post -Headers $headers -Body $ratePlan1 | Out-Null
    Write-Host "  ✓ Rate plan 1 created" -ForegroundColor Green
    
} catch {
    Write-Host "✗ Failed to create Hotel 1: $_" -ForegroundColor Red
}

Write-Host "`n========================================"
Write-Host "Process Complete"
Write-Host "========================================"
