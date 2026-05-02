"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    Loader2,
    Clock,
    ChevronDown,
    ChevronUp,
    Flame,
    Beef,
    Droplets,
    Wheat,
    Search,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { DashboardHeader } from "@/components/dashboard-header"
import { NutritionLabel } from "@/components/nutrition-label"
import { NutritionCharts } from "@/components/nutrition-charts"

interface RecipeHistory {
    _id: string
    name: string
    servingSize: number
    ingredients: { name: string; quantity: number; unit: string }[]
    nutrition: {
        calories: number
        protein: number
        fat: number
        saturatedFat?: number
        carbohydrates: number
        sugar: number
        sodium: number
        fiber: number
    } | null
    fssaiCompliant: boolean | null
    goalAnalysis: {
        goal: string
        suitable: boolean
        aiComment: string
    } | null
    createdAt: string
}

export default function HistoryPage() {
    const router = useRouter()
    const { user, isLoading } = useAuth()
    const [recipes, setRecipes] = useState<RecipeHistory[]>([])
    const [loading, setLoading] = useState(true)
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/auth")
        }
    }, [user, isLoading, router])

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const res = await fetch("/api/recipe")
                if (!res.ok) throw new Error("Failed to fetch")
                const { recipes: data } = await res.json()
                setRecipes(data)
            } catch (err) {
                console.error("Failed to fetch history:", err)
            } finally {
                setLoading(false)
            }
        }

        if (user) {
            fetchRecipes()
        }
    }, [user])

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!user) {
        return null
    }

    const filteredRecipes = recipes.filter((r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id)
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader />
            <main className="mx-auto max-w-4xl px-4 py-8">
                <div className="mb-6">
                    <h1
                        className="text-3xl font-bold text-foreground"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Recipe History
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        View all your previously analyzed recipes and their nutrition data.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-6 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    />
                </div>

                {loading && (
                    <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm">Loading history...</p>
                    </div>
                )}

                {!loading && filteredRecipes.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card py-20 text-muted-foreground">
                        <Clock className="h-10 w-10 text-muted-foreground/40" />
                        <p className="text-sm">
                            {searchQuery
                                ? "No recipes match your search."
                                : "No recipes analyzed yet. Go to your dashboard and analyze a recipe!"}
                        </p>
                    </div>
                )}

                {!loading && filteredRecipes.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {filteredRecipes.map((recipe) => {
                            const isExpanded = expandedId === recipe._id
                            return (
                                <div
                                    key={recipe._id}
                                    className="rounded-xl border border-border bg-card overflow-hidden transition-all"
                                >
                                    {/* Collapsed Summary Row */}
                                    <button
                                        onClick={() => toggleExpand(recipe._id)}
                                        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-muted/30"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-base font-semibold text-card-foreground">
                                                {recipe.name}
                                            </h3>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {formatDate(recipe.createdAt)}
                                                </span>
                                                <span>{recipe.servingSize}g serving</span>
                                                <span>{recipe.ingredients.length} ingredients</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {recipe.nutrition && (
                                                <div className="hidden items-center gap-3 sm:flex">
                                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Flame className="h-3.5 w-3.5 text-orange-400" />
                                                        <span>{recipe.nutrition.calories} kcal</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Beef className="h-3.5 w-3.5 text-red-400" />
                                                        <span>{recipe.nutrition.protein}g</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Droplets className="h-3.5 w-3.5 text-yellow-400" />
                                                        <span>{recipe.nutrition.fat}g</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Wheat className="h-3.5 w-3.5 text-green-400" />
                                                        <span>{recipe.nutrition.carbohydrates}g</span>
                                                    </div>
                                                </div>
                                            )}

                                            {recipe.goalAnalysis && (
                                                <span
                                                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${recipe.goalAnalysis.suitable
                                                            ? "bg-primary/10 text-primary"
                                                            : "bg-destructive/10 text-destructive"
                                                        }`}
                                                >
                                                    {recipe.goalAnalysis.suitable ? "✓ Goal Fit" : "✗ Not Ideal"}
                                                </span>
                                            )}

                                            {recipe.fssaiCompliant !== null && (
                                                <span
                                                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${recipe.fssaiCompliant
                                                            ? "bg-primary/10 text-primary"
                                                            : "bg-destructive/10 text-destructive"
                                                        }`}
                                                >
                                                    {recipe.fssaiCompliant ? "FSSAI ✓" : "FSSAI ✗"}
                                                </span>
                                            )}

                                            {isExpanded ? (
                                                <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Expanded Detail */}
                                    {isExpanded && (
                                        <div className="border-t border-border px-5 py-6">
                                            {/* Ingredients List */}
                                            <div className="mb-6">
                                                <h4 className="mb-3 text-sm font-semibold text-card-foreground uppercase tracking-wider">
                                                    Ingredients
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {recipe.ingredients.map((ing, i) => (
                                                        <span
                                                            key={i}
                                                            className="rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs text-card-foreground"
                                                        >
                                                            {ing.name} — {ing.quantity} {ing.unit}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Goal Analysis */}
                                            {recipe.goalAnalysis && (
                                                <div className="mb-6">
                                                    <h4 className="mb-3 text-sm font-semibold text-card-foreground uppercase tracking-wider">
                                                        Goal Analysis — {recipe.goalAnalysis.goal.replace("_", " ")}
                                                    </h4>
                                                    <div
                                                        className={`rounded-lg border p-4 ${recipe.goalAnalysis.suitable
                                                                ? "border-primary/30 bg-primary/5"
                                                                : "border-destructive/30 bg-destructive/5"
                                                            }`}
                                                    >
                                                        <p className="text-sm text-card-foreground">
                                                            {recipe.goalAnalysis.aiComment}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Nutrition Label & Charts */}
                                            {recipe.nutrition && (
                                                <div className="grid gap-6 lg:grid-cols-2">
                                                    <div>
                                                        <h4 className="mb-3 text-sm font-semibold text-card-foreground uppercase tracking-wider">
                                                            FSSAI Nutrition Label
                                                        </h4>
                                                        <NutritionLabel
                                                            recipeName={recipe.name}
                                                            servingSize={recipe.servingSize}
                                                            nutrition={recipe.nutrition}
                                                            fssaiCompliant={recipe.fssaiCompliant}
                                                        />
                                                    </div>

                                                    {user.role === "user" && (
                                                        <div>
                                                            <h4 className="mb-3 text-sm font-semibold text-card-foreground uppercase tracking-wider">
                                                                Nutrition Charts
                                                            </h4>
                                                            <NutritionCharts
                                                                nutrition={recipe.nutrition}
                                                                servingSize={recipe.servingSize}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </main>
        </div>
    )
}
