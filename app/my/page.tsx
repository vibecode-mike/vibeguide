import { DashboardLayout } from "@/components/dashboard/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Calendar, 
  CreditCard, 
  FileText, 
  TrendingUp,
  Settings,
  Gift
} from "lucide-react";

// Mock user data - will be replaced with real data from database
const mockUser = {
  id: "user-123",
  email: "user@example.com",
  fullName: "John Developer",
  avatarUrl: null,
  credits: 15,
  createdAt: "2024-01-01",
  totalProjects: 12,
  documentsGenerated: 60
};

const mockCreditHistory = [
  {
    id: "1",
    type: "purchase",
    amount: 30,
    description: "Professional Plan Purchase",
    date: "2024-01-15"
  },
  {
    id: "2",
    type: "usage",
    amount: -1,
    description: "E-commerce App Documentation",
    date: "2024-01-14"
  },
  {
    id: "3",
    type: "usage",
    amount: -1,
    description: "Task Management System Documentation",
    date: "2024-01-12"
  },
  {
    id: "4",
    type: "purchase",
    amount: 10,
    description: "Starter Plan Purchase",
    date: "2024-01-10"
  }
];

export default function ProfilePage() {
  const headerActions = (
    <Button variant="outline" className="gap-2">
      <Settings className="h-4 w-4" />
      Edit Profile
    </Button>
  );

  return (
    <DashboardLayout 
      title="My Profile" 
      description="Manage your account settings and view usage statistics"
      headerActions={headerActions}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={mockUser.avatarUrl || ""} />
                  <AvatarFallback className="text-lg">
                    {mockUser.fullName?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{mockUser.fullName}</h3>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {mockUser.email}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Calendar className="h-4 w-4" />
                    Member since {new Date(mockUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue={mockUser.fullName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={mockUser.email} disabled />
                </div>
              </div>

              <Button className="gap-2">
                <Settings className="h-4 w-4" />
                Update Profile
              </Button>
            </CardContent>
          </Card>

          {/* Credit History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Credit History
              </CardTitle>
              <CardDescription>
                Track your credit purchases and usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCreditHistory.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'purchase' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'purchase' ? (
                          <Gift className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">credits</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* Credits Card */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <CreditCard className="h-5 w-5" />
                Available Credits
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-4xl font-bold text-primary">{mockUser.credits}</div>
              <p className="text-sm text-muted-foreground">
                Each credit generates 5 comprehensive documents
              </p>
              <Button className="w-full gap-2">
                <Gift className="h-4 w-4" />
                Buy More Credits
              </Button>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Usage Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Projects</span>
                <Badge variant="secondary">{mockUser.totalProjects}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Documents Generated</span>
                <Badge variant="secondary">{mockUser.documentsGenerated}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Credits Used</span>
                <Badge variant="secondary">{mockUser.totalProjects}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <Badge className="bg-green-500">100%</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full gap-2">
                <FileText className="h-4 w-4" />
                View All Projects
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <CreditCard className="h-4 w-4" />
                Purchase Credits
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Settings className="h-4 w-4" />
                Account Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}